import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, TextInput, KeyboardAvoidingView } from "react-native";
import { BACKGROUND, TEXT } from '../../helper/Color';
import Route from "../../Network/route";
import { BASE_HOST_URL, BASE_URL, USERDETAIL } from "../../helper/Constant";
import CalendarStrip from 'react-native-calendar-strip'
import CustomHeader from "../../component/CustomHeader";
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from "react-native-image-picker";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const route = new Route(BASE_URL);
const re = /(?:\.([^.]+))?$/;

const DoctorBookFirst = (props) => {

    const [defaultState, setDefaultState] = useState({
        uri: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
        name: "Dr. jitendra Raut",
        bio: "B.se, MBBS, DDVL, MD-, Dermitol nbdkswoi",
        months: [
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov"
        ],
        notAvailable: false,
        morningSlots: [{ text: "10.00", selected: false }, { text: "11.00", selected: false }, { text: "12.00", selected: false }, { text: "13.00", selected: false }, { text: "14.00", selected: false }, { text: "15.00", selected: false }, { text: "16.00", selected: false }, { text: "17.00", selected: false }, { text: "18.00", selected: false }],
        selectedDate: new Date(),
        nextAvailableDate: new Date(),
        selectedTimeSlot: "",
        selectedTimeLable: "",
        selectedSchedule: '',
        moveNext: false,
        attachments: [],
        notes: '',
        fee: 500,
        error: '',
    });

    const [morningSlots, setMorningSlots] = useState([]);
    const [morning, setMorning] = useState([]);
    const [afternoon, setAfternoon] = useState([]);
    const [evening, setEvening] = useState([]);
    const [doctor, setDoctor] = useState({});
    const user = useSelector(state => state.user);


    useEffect(() => {
        const params = props.route.params;
        console.log(params, 'params in booking screen');
        setDoctor(params.doctorId)
    }, []);


    useEffect(() => {
        if (doctor.user) {
            getDoctor(defaultState.selectedDate);
        }
    }, [doctor])



    const makeSlots = (time) => {
        const morningSlotTime = [];
        console.log(time, 'time');

        if (time.length > 0) {
            for (let tIndex = 0; tIndex < time.length; tIndex++) {
                const element = time[tIndex];
                for (let index = element.from; index < element.to; index++) {
                    let minutes = element.timeToEntertainSlot;

                    index === element.from && morningSlotTime.push({ text: `${index}:00`, selected: false, schedule: element.schedule });

                    do {
                        if (minutes === 60) {
                            morningSlotTime.push({ text: `${index + 1}:00`, selected: false, schedule: element.schedule });
                        }
                        else {
                            morningSlotTime.push({ text: `${index}:${minutes}`, selected: false, schedule: element.schedule });
                        }
                        minutes = minutes + element.timeToEntertainSlot;

                    } while (minutes <= 60);
                }
                morningSlotTime.pop();
            }


        }



        return morningSlotTime;
    }


    const getDoctor = (date) => {
        console.log(date, 'date');
        route.get(`user/doctor-full-profile?userId=${doctor.user._id}&date=${new Date(date)}&schedule=true`)
            .then(res => {

                if (res.status) {
                    console.log(res, 'red');
                    if (res.data.available) {
                        if (res.data.slots.length > 0) {
                            setMorning(res.data.slots);
                        }
                        setDefaultState({ ...defaultState, notAvailable: false, selectedDate: new Date(date) })
                    }
                    else {
                        setDefaultState({ ...defaultState, nextAvailableDate: new Date(res.data.nextAvailableDate), notAvailable: true, selectedDate: new Date(date) })
                    }
                }
                else {
                    Alert.alert("Error", JSON.stringify(res.message))
                }
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(res.message))
            });
    }

    const selectFile = () => {
        console.log("select file");
        const option = {
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchImageLibrary(option, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                var photo = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                    base64: response.base64
                };
                try {
                    console.log("calling api")
                    fetch(`${BASE_HOST_URL}/api/open/upload-chat-image`, {
                        headers: {
                            Authorization: `Bearer nothing`,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(photo)
                    })
                        .then(response => {
                            response.json().then(res => {
                                console.log(res, 'res')
                                if (res.data.length > 0) {
                                    let previousNotUploadedImages = defaultState.attachments;
                                    let indexShouldBe = previousNotUploadedImages.findIndex(x => {
                                        return !x.includes('https://storage.googleapis.com/e-health-assets/')
                                    });
                                    if (indexShouldBe > -1) {
                                        previousNotUploadedImages.splice(indexShouldBe, 1);
                                    }
                                    setDefaultState({ ...defaultState, attachments: [...previousNotUploadedImages, ...res.data] })
                                }
                            });
                        })
                        .catch(e => {
                            console.log(e, 'err');
                        });
                } catch (error) {
                    console.log(error, 'err');

                }
                setDefaultState({ ...defaultState, attachments: [...defaultState.attachments, response.uri] })

            }
        });

    };

    const createAppointment = (reqBody) => {
        route.postAuthenticated('appointment/', reqBody, user.userToken)
            .then(res => {
                if (res.status) {
                    props.navigation.goBack()
                }
                else {
                    Alert.alert("Sorry !", "This slot has been booked earlier");
                }
            })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>

            {doctor.user && <View style={{ flex: 1 }} >

                <View style={styles.mainBg} >
                    <CustomHeader paddingTop={25} paddingBottom={20} left="Skip" type="icon" leftPress={() => props.navigation.goBack()} color={TEXT.primary} iconName="arrowleft" inFrontOfLeft="Select a time slot" bgColor={BACKGROUND.primary} inFrontOfLeftStyle={{ marginLeft: 10, fontWeight: 'bold', marginTop: 2, color: 'white' }} width={'80%'} />
                </View>

                <ScrollView style={{ flex: 1, zIndex: 100, marginTop: -65 }}>
                    <View style={{ width: '92%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 5, }} >
                        <View style={{ flexDirection: 'row' }} >
                            <Image style={{ height: 60, width: 60, borderRadius: 50 }} source={doctor.user.profileImg != '' ? { uri: doctor.user.profileImg } : require('../../assets/default.jpg')} />
                            <View style={{ marginLeft: 20, marginTop: 5 }} >
                                <Text style={{ fontWeight: 'bold' }} > Dr. {doctor.user.firstName} {doctor.user.lastName} </Text>
                                <Text numberOfLines={1} style={{ color: 'gray', fontSize: 12, lineHeight: 25, width: '75%' }}>  {doctor.user.bio} </Text>
                            </View>

                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', marginTop: 20 }} ></View>

                        {(defaultState.selectedTimeSlot == '' | !defaultState.error == '' | !defaultState.moveNext) === 1 && <View style={{ width: '100%', flexDirection: 'row' }}   >
                            <CalendarStrip
                                calendarAnimation={{ type: 'sequence', duration: 30 }}
                                daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: BACKGROUND.primary }}
                                style={{ height: 100, paddingTop: 10, width: '100%', paddingBottom: 10 }}
                                calendarHeaderStyle={{ color: 'black' }}
                                calendarColor={'white'}
                                dateNumberStyle={{ color: 'black' }}
                                dateNameStyle={{ color: 'black' }}
                                highlightDateNumberStyle={{ color: BACKGROUND.primary }}
                                highlightDateNameStyle={{ color: BACKGROUND.primary }}
                                disabledDateNameStyle={{ color: 'grey' }}
                                disabledDateNumberStyle={{ color: 'grey' }}
                                iconContainer={{ flex: 0.1 }}
                                startingDate={new Date()}
                                selectedDate={defaultState.selectedDate}
                                minDate={new Date()}
                                onDateSelected={(date) => {
                                    setDefaultState({ ...defaultState, selectedDate: new Date(date) });
                                    getDoctor(date);
                                }}
                            />
                        </View>}
                        {defaultState.moveNext && defaultState.selectedTimeSlot != '' &&
                            <View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                    <View>
                                        <Text style={{ color: '#898a8f' }}>DATE & TIME</Text>
                                        <Text style={{ color: '#313450', lineHeight: 20 }}>{defaultState.selectedDate.getDate() + ' ' + defaultState.months[defaultState.selectedDate.getMonth() + 1] + ' ' + defaultState.selectedDate.getFullYear()}</Text>
                                        <Text style={{ fontSize: 13 }}> {defaultState.selectedTimeSlot} </Text>
                                    </View>
                                    <View style={{ width: 1, height: '100%', backgroundColor: '#d6d6d6' }}>

                                    </View>
                                    <View>
                                        <Text style={{ color: '#898a8f' }} >Consultation Fees</Text>
                                        <Text style={{ marginRight: 80, lineHeight: 20 }}>PKR {doctor.user.fee}</Text>
                                    </View>

                                </View>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', marginTop: 10 }} />

                                <View style={{ paddingTop: 20 }} >
                                    <TextInput multiline={true} onChangeText={(e) => {
                                        setDefaultState({ ...defaultState, notes: e })
                                    }} placeholder="Notes ( Optional )" style={{ justifyContent: 'flex-start', height: 100, backgroundColor: '#F6F6F6', borderColor: '#D6D6D6', borderWidth: 0.9, borderRadius: 15, padding: 15, textAlignVertical: 'top' }} ></TextInput>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 17, marginBottom: 10 }} >
                                    <Text style={{ fontSize: 10, color: '#898a8f', marginLeft: 1, }}>By booking this appointment you agree to the</Text><Text style={{ fontSize: 10, color: '#3CB9C7', marginLeft: 1, }} > T&C</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }} >
                                    <Text style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 17 }} >Attachments</Text>
                                    <View style={{ backgroundColor: 'white', elevation: 4, padding: 5, borderRadius: 50, justifyContent: 'center' }} >
                                        <Entypo
                                            name={'attachment'}
                                            size={18}
                                            color={BACKGROUND.primary}
                                            onPress={() => selectFile()}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, justifyContent: 'space-between' }} >
                                    {defaultState.attachments.map((x, index) => {
                                        return (<View style={[{ marginVertical: 5, width: '45%' }]} >
                                            <View style={{ flexDirection: 'row' }} >
                                                <Image style={{ height: 100, width: '100%', borderRadius: 15 }} source={{ uri: x }} />
                                                <View style={{ backgroundColor: 'white', elevation: 4, padding: 5, borderRadius: 50, justifyContent: 'center', height: 20, width: 20, marginLeft: -25, marginTop: 5 }} >
                                                    <AntDesign
                                                        name={'close'}
                                                        size={10}
                                                        color={BACKGROUND.primary}
                                                        onPress={() => {
                                                            let previousImages = defaultState.attachments;
                                                            previousImages.splice(index, 1);
                                                            setDefaultState({ ...defaultState, attachments: [...previousImages] })
                                                        }}
                                                    />
                                                </View>

                                            </View>

                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#ffffff00", "#999999"]} style={[{ backgroundColor: 'tansparent', width: '100%', alignItems: 'center', borderRadius: 80, position: 'absolute', bottom: 0, height: 17, }]} >
                                                <Text style={{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10, paddingRight: 10, color: TEXT.primary }} >
                                                    {("attacchments" + re.exec(x)).split(',')[0]}
                                                </Text>
                                            </LinearGradient>
                                            {/* <View style={{height: 200, backgroundColor: 'red', width: '100%'}} >
                                        </View> */}
                                        </View>
                                        )
                                    })}

                                </View>
                            </View>
                        }
                        {defaultState.notAvailable && <View>
                            <View style={{ marginTop: 50 }}  >
                                <Text style={{ textAlign: 'center', color: 'gray' }} > No slots availabe for today </Text>
                            </View>

                            <View style={{ marginTop: 25 }}  >
                                <View style={{ backgroundColor: BACKGROUND.primary, padding: 15, borderRadius: 50, width: '75%', alignSelf: 'center' }} >
                                    <TouchableOpacity onPress={() => {
                                        setDefaultState({ ...defaultState, selectedDate: defaultState.nextAvailableDate });
                                        getDoctor(defaultState.nextAvailableDate);
                                    }}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} > Next day availablity on {defaultState.nextAvailableDate.getDate()} {defaultState.months[defaultState.nextAvailableDate.getMonth() + 1]} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        }

                        {!defaultState.notAvailable && !defaultState.moveNext && <View>

                            {morning.length > 0 && <View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#FBFBFB', borderWidth: 0.3, borderColor: '#D6D6D6', borderRadius: 10 }} >
                                    <ScrollView contentContainerStyle={styles.slotTimes} >
                                        {morning.length > 0 && morning.map((item, index) => {
                                            return <View style={[styles.eachSlotTime, item.booked && styles.bookedEarlier, item.text === defaultState.selectedTimeSlot && styles.bookedNow]}>
                                                <TouchableOpacity onPress={() => {
                                                    !item.booked && setDefaultState({ ...defaultState, selectedTimeLable: "morning", selectedTimeSlot: item.text, selectedSchedule: item.schedule })
                                                }}>
                                                    <Text style={[styles.time, item.text === defaultState.selectedTimeSlot && styles.bookedNow]} >
                                                        {item.text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        })}
                                    </ScrollView>
                                </View>
                            </View>}

                        </View>
                        }

                        {defaultState.notAvailable === false && <View>
                            <Text style={[{ textAlign: 'center', padding: 20, color: 'white' }, defaultState.error && { color: 'black' }]} >Please select a slot to continue</Text>
                            <View style={{ alignSelf: 'center', paddingTop: '1%' }} >
                                <TouchableOpacity onPress={async () => {
                                    if (defaultState.moveNext && defaultState.selectedTimeSlot) {
                                        console.log('call  api');
                                        let currentUser = await AsyncStorage.getItem(USERDETAIL);
                                        let currentUserInJson = JSON.parse(currentUser);
                                        // setUserId(currentUserInJson.user._id);
                                        let reqBody = {
                                            doctor: doctor.user._id,
                                            date: defaultState.selectedDate,
                                            timeSlot: defaultState.selectedTimeSlot,
                                            timeLable: defaultState.selectedTimeLable,
                                            attachments: defaultState.attachments,
                                            notes: defaultState.notes,
                                            schedule: defaultState.selectedSchedule,
                                            patient: currentUserInJson.user._id,
                                        };

                                        console.log(reqBody, 'req body');
                                        createAppointment(reqBody);
                                    }
                                    else if (defaultState.selectedTimeSlot == '') {
                                        setDefaultState({ ...defaultState, error: 'errored', moveNext: false })
                                    }
                                    else {
                                        setDefaultState({ ...defaultState, error: '', moveNext: true })

                                    }

                                }} style={{ width: 186, height: 40, borderRadius: 50, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1, backgroundColor: '#3a58fc' }}>
                                    <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white' }}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        }

                    </View>
                </ScrollView>

            </View>
            }
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    mainBg: {
        backgroundColor: BACKGROUND.primary,
        height: 150,
        width: '100%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    backArrow: {
        margin: 20,
        marginTop: 35,
    },
    headerText: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    linearGradient: {
        borderRadius: 50
    },
    slotTimes: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        // paddingLeft: 10
    },
    eachSlotTime: {
        backgroundColor: TEXT.primary,
        height: 45,
        width: '25%',
        marginVertical: 10,
        marginLeft: '6%',
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
    bookedEarlier: {
        backgroundColor: '#FBFBFB'
    },
    bookedNow: {
        backgroundColor: BACKGROUND.primary,
        color: TEXT.primary
    }
})

export default DoctorBookFirst;