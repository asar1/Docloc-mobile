/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native';
import { BACKGROUND, BLACK, TEXT, WHITE } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-community/async-storage";
import Route from '../../Network/route';
import { BASE_URL, USERDETAIL } from '../../helper/Constant';

const route = new Route(BASE_URL);

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Satureday',
    'Sunday',
];

const EditSchedule = (props) => {

    const [avialbleDays, setAvialbleDays] = useState([]);

    const [showTimePicker, setShowTimePicket] = useState(false);
    const [current, setCurrent] = useState({ actualTime: new Date() });

    const [slots, setSlots] = useState([]);
    const [slotTime, setSlotTime] = useState(0);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        (async () => await getSchedule())();
        if (slots.length === 0) {
            setSlots([
                { from: '', to: '', error: '', actualTimefrom: new Date(), actualTimeto: new Date(), totalMinutes: 0, doctor: userId }
            ])
        }
    }, [])

    useEffect(() => {
        console.log("tempered")
    }, [slotTime])

    const goBack = () => {
        props.navigation.goBack();
    }

    const addMoreSchedule = () => {
        let allFilled = true;
        let atLeastOneSlot = true;

        if (slotTime) {
            for (let index = 0; index < slots.length; index++) {
                if (slots[index].to === '' || slots[index].from === '') {
                    allFilled = false;
                }

                console.log(slots[index].totalMinutes, 'minutes');
                if (slots[index].totalMinutes < slotTime) {
                    atLeastOneSlot = false;
                }
            }

            if (allFilled && atLeastOneSlot) {
                setSlots([...slots, { from: '', to: '', error: '', actualTimefrom: new Date(), actualTimeto: new Date(), doctor: userId }]);
            }
            else {
                let previousSlots = slots;

                previousSlots[previousSlots.length - 1].error = atLeastOneSlot ? "please fill out the above slot" : "Invalid Schedule for slot duration";

                setSlots([...previousSlots]);
            }
        }
        else {
            let previousSlots = slots;

            previousSlots[previousSlots.length - 1].error = "Please add slot duration first";

            setSlots([...previousSlots]);
        }



    }

    const onChange = (prop, index) => {

        console.log(slots[index]['actualTime' + prop], 'slots');
        if (slotTime) {
            setCurrent({
                index: index,
                prop: prop,
                actualTime: slots[index][prop].value !== '' ? new Date(slots[index]['actualTime' + prop]) : new Date()
            });
            let previousSlots = slots;

            previousSlots[previousSlots.length - 1].error = "";

            setSlots([...previousSlots]);

            setShowTimePicket(true);
        }
        else {
            let previousSlots = slots;

            previousSlots[previousSlots.length - 1].error = "Please add slot duration first";

            setSlots([...previousSlots]);
        }

    }

    const onChangeTime = (time, dateObj) => {
        let previousSlots = slots;
        let selectedObj = previousSlots[current.index];

        selectedObj[current.prop] = time;
        selectedObj['actualTime' + current.prop] = dateObj;

        if (selectedObj.from && selectedObj.to) {
            selectedObj['totalMinutes'] = timedifference(new Date(selectedObj.actualTimefrom), new Date(selectedObj.actualTimeto));
            console.log(selectedObj.totalMinutes, 'minutes=>');
        }

        setSlots([...previousSlots]);
        setShowTimePicket(false);

    }

    const removeItem = (index) => {
        if (slots.length > 1) {
            let previousSlots = slots;

            previousSlots.splice(index, 1);
            setSlots([...previousSlots]);
        }
    }

    const onPressDay = (day) => {
        console.log("pressed item", day);
        let previousDays = avialbleDays;
        console.log("pressed", previousDays);
        let previousDay = previousDays.findIndex(x => x.day === day);
        console.log(previousDay, 'previous day');
        if (previousDay > -1) {
            previousDays.splice(previousDay, 1);
        }
        else {
            previousDays = [...previousDays, { day: day, availability: 'unavailable', doctor: userId }]
        }
        console.log(previousDays, 'days');
        setAvialbleDays([...previousDays]);

    }
    const timedifference = (start, end) => {
        var startDate = new Date(0, 0, 0, start.getHours(), start.getMinutes(), 0);
        var endDate = new Date(0, 0, 0, end.getHours(), end.getMinutes(), 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        if (hours < 0)
            hours = hours + 24;
        let totalMinutes = (hours * 60) + minutes;

        return totalMinutes;
    }

    const updateSchedule = () => {
        console.log(userId, 'userid')
        console.log(avialbleDays, 'days')
        console.log(slots, 'days')
        let slotsToSend = slots;
        slotsToSend[0].doctor = userId;
        route.postdata('schedule/schedule-and-available', {
            "avialbleDays": avialbleDays,
            "doctor": userId,
            "slots": slotsToSend,
            "timeToEntertainSlot": slotTime
        })
            .then(res => {
                if (res.status) {
                    props.navigation.goBack();
                }
                else {
                    Alert.alert("Error", res.message)
                }
                console.log(res, 'res')
            })
            .catch(err => console.log(err, 'err'))
    }

    const getSchedule = async () => {
        let currentUser = await AsyncStorage.getItem(USERDETAIL);
        let currentUserInJson = JSON.parse(currentUser);
        setUserId(currentUserInJson.user._id);
        route.get('schedule/' + currentUserInJson.user._id)
            .then(res => {
                if (res.status) {
                    // console.log(res.data.slotTime, 'slot time')
                    setAvialbleDays(res.data.avialbleDays);
                    setSlotTime(res.data.slotTime.toString());
                    if (res.data.schedules.length > 0) { setSlots(res.data.schedules); }
                }
                else {
                    Alert.alert("Error", res.message)
                }
            })
            .catch(err => console.log(err, 'err'))
    }
    return (
        <View style={styles.container} >
            <View style={{ backgroundColor: '#F5F5F5' }} >
                {console.log(current.actualTime.getTime(), 'curent')}
                {showTimePicker === true && <DateTimePicker
                    testID="dateTimePicker1"
                    value={current ? current.actualTime : new Date()}
                    // value={new Date()}
                    mode={'time'}
                    is24Hour={false}
                    display="default"
                    onChange={(e, d) => {
                        if (d) {
                            const hours = d.getHours().toString().length > 1 ? d.getHours() : '0' + d.getHours();
                            const minutes = d.getMinutes().toString().length > 1 ? d.getMinutes() : '0' + d.getMinutes();

                            if (minutes != '00') {
                                Alert.alert('Error', 'Please select minutes which are divisible by 60')
                            }
                            else {
                                onChangeTime(hours + ":" + minutes, d);

                            }
                        }
                    }}
                />
                }
                <View style={styles.header} >
                    <CustomHeader paddingTop={25} paddingBottom={20} left="Skip" type="icon" leftPress={goBack} color={TEXT.primary} iconName="arrowleft" inFrontOfLeft="Edit Schedule" bgColor={BACKGROUND.primary} inFrontOfLeftStyle={styles.headerTitle} width={'80%'} />
                </View>
                <View style={styles.availabilitySection}>
                    <Text style={styles.heading} >
                        Select your availability. You can update that any time
                    </Text>
                    <View style={styles.availableDays} >
                        {days.map((item, index) => <TouchableOpacity onPress={() => {

                            onPressDay(item);
                        }} >
                            <View style={styles.editDays} >
                                <View style={[styles.availableDayWrapper, avialbleDays.filter(x => x.day === item).length > 0 && avialbleDays.filter(x => x.day === item)[0].availability === "unavailable" && styles.isAvailableWrapper]} >
                                    <MaterialIcons name="done" size={12} color={WHITE.dark} />
                                </View>
                                <View style={styles.divider} />
                                <Text key={index} style={[styles.availableDay, avialbleDays.filter(x => x.day === item).length > 0 && avialbleDays.filter(x => x.day === item)[0].availability === "unavailable" && styles.unavailableDay]}>
                                    {item}
                                </Text>

                            </View>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: TEXT.primary }} >
                <ScrollView>
                    <View style={styles.appointmentSlotSection} >
                        <Text style={styles.slotHeading} >
                            Create Appointment Slots
                        </Text>
                        <View style={{ paddingVertical: 20, paddingBottom: 0 }} >
                            <TextInput onChangeText={(e) => {
                                console.log(e, 'asdfsdfsdf')
                                if (e < 61) { setSlotTime(e) }
                            }} value={slotTime} defaultValue={slotTime} style={{ height: 42, width: '100%', borderWidth: 1, borderColor: '#ECECEC', paddingVertical: 3, paddingLeft: 20, borderRadius: 13 }} placeholder="Slot duration (in minutes)" />
                        </View>
                        <View >
                            {slots.map((item, index) => {
                                return <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }} >
                                        <TouchableOpacity style={{ flex: 1, marginRight: 20 }} onPress={() => onChange("from", index)} >
                                            <View
                                                style={{ height: 42, borderWidth: 1, borderColor: '#ECECEC', paddingVertical: 3, borderRadius: 13, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={item.from ? { color: '#707070', fontWeight: 'bold' } : { color: '#D6D6D6' }} >{item.from ? item.from : 'Available From'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={() => onChange("to", index)} >
                                            <View
                                                style={{ height: 42, borderWidth: 1, borderColor: '#ECECEC', paddingVertical: 3, borderRadius: 13, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={item.to ? { color: '#707070', fontWeight: 'bold' } : { color: '#D6D6D6' }} >{item.to ? item.to : 'Available To'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {index !== 0 && <TouchableOpacity style={{ width: '5%' }} onPress={() => removeItem(index)} >
                                            <View
                                                style={{ height: 42, paddingVertical: 3, borderRadius: 13, justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}
                                            >
                                                <AntDesign name="closecircle" size={15} color={BACKGROUND.primary} />
                                            </View>
                                        </TouchableOpacity>}
                                    </View>
                                    {item.error !== '' && <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }} >
                                        <Text>{item.error}</Text>
                                    </View>}
                                </View>

                            })}

                        </View>

                        <Text style={styles.addMore} onPress={() => addMoreSchedule()} >
                            Add more
                        </Text>
                    </View>
                </ScrollView>

                <TouchableOpacity activeOpacity={1} onPress={() => {
                    let allFilled = true;
                    let atLeastOneSlot = true;
                    let isError = false;

                    if (slotTime) {
                        for (let index = 0; index < slots.length; index++) {
                            if (slots[index].to === '' || slots[index].from === '') {
                                allFilled = false;
                                isError = true;
                            }

                            console.log(slots[index].totalMinutes, 'minutes');
                            if (slots[index].totalMinutes < slotTime) {
                                atLeastOneSlot = false;
                                isError = true;
                            }
                        }

                        if (!allFilled || !atLeastOneSlot) {
                            let previousSlots = slots;

                            previousSlots[previousSlots.length - 1].error = atLeastOneSlot ? "please fill out the above slot" : "Invalid Schedule for slot duration";

                            setSlots([...previousSlots]);
                        }
                    }
                    else {
                        let previousSlots = slots;

                        previousSlots[previousSlots.length - 1].error = "Please add slot duration first";
                        isError = true;

                        setSlots([...previousSlots]);
                    }

                    if (isError) {
                        console.log('NO api call');
                    }
                    else {
                        updateSchedule();
                    }

                }} >
                    <View style={{ width: 186, height: 40, borderRadius: 50, marginBottom: 20, backgroundColor: BACKGROUND.primary, justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }} >
                        <Text style={{ textAlign: 'center', color: TEXT.primary, fontWeight: 'bold' }} >Update</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    header: {
        backgroundColor: BACKGROUND.primary,
        width: '100%',
        height: 90,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
    },
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        fontWeight: '700',
        color: TEXT.primary
    },
    availabilitySection: {
        padding: 20,
        paddingBottom: 10
    },
    availableDays: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center'
    },
    heading: {
        fontSize: 12,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: TEXT.secondary
    },
    slotHeading: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: TEXT.secondary,
        paddingTop: 15
    },
    availableDay: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: BACKGROUND.primary,
    },
    addMore: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: BACKGROUND.primary,
        padding: 15,
        paddingLeft: 0
    },
    unavailableDay: {
        color: TEXT.time
    },
    availableDayWrapper: {
        height: 16,
        width: 16,
        backgroundColor: BACKGROUND.primary,
        borderRadius: 18.5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    isAvailableWrapper: {
        backgroundColor: TEXT.time,
    },
    editDays: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    divider: {
        width: 6
    },
    appointmentSlotSection: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 20,
        backgroundColor: TEXT.primary,
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 4
    },
    slotPartion: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: 40,
        borderRadius: 20,
        backgroundColor: TEXT.primary,
        alignItems: 'center',
        elevation: 4
    },
    slotSection: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    eachSlotPartion: {
        width: '34%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
    },
    currentSelectedPartion: {
        backgroundColor: BACKGROUND.primary,
        borderRadius: 20
    },
    currentSelectedPartionText: {
        color: TEXT.primary,
    },
    slotTimes: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        paddingLeft: 10
    },
    eachSlotTime: {
        backgroundColor: TEXT.primary,
        height: 45,
        width: 98,
        marginVertical: 10,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    time: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        color: TEXT.time
    },
    noSlotsAvailable: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default EditSchedule;