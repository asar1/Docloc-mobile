import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';
import { BACKGROUND } from '../../helper/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import Route from '../../Network/route';
import { BASE_URL } from '../../helper/Constant';


const route = new Route(BASE_URL);

const AddMedicalRecords = (props) => {
    const [state, setState] = useState({});

    const user = useSelector(state => state.user);

    const submit = () => {
        console.log(state, 'state');
        console.log( JSON.parse(user.userDetail.userDetails), 'user from redux');

        if (state.testType && state.date && state.hospital && state.notes) {
            setState({ ...state, error: '' });

            const reqBody = {
                testName: state.testType,
                date: state.date,
                from: state.hospital,
                notes: state.notes,
                patient: props.route.params.patient,
                doctor: JSON.parse(user.userDetail.userDetails).user._id
            }

            console.log(reqBody, 'req body');

            route.postAuthenticated(`medical-records`, reqBody, user.userToken)
            .then(res => {
                if (res.status) {

                    props.navigation.goBack();
                }
                else {
                    Alert.alert("Error", JSON.stringify(res.message))
                }
            })
            .catch(err => {
                Alert.alert("Error", JSON.stringify(err))
            });
        }
        else {
            setState({ ...state, error: 'Please fill in all the fields.' });
        }

    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#f5f5f5' }} showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: BACKGROUND.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: '37%', }}>
                <View style={[styles.backArrow, { flexDirection: 'row', marginLeft: 20, marginTop: 30 }]} >
                    <Ionicons onPress={() => props.navigation.goBack()} name={'arrow-back'} size={25} color={"white"} ></Ionicons>
                    <Text style={{ marginLeft: 15, fontWeight: 'bold', color: 'white', fontSize: 20 }}>  Add Medical Record </Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 10, marginBottom: 10, borderRadius: 20, elevation: 4, backgroundColor: 'white', padding: 20, marginTop: '-30%', height: '85%', justifyContent: 'space-between' }}>
                <View>
                    <View>
                        <Text style={styles.inputText}>Test Type</Text>
                        <TextInput placeholder='Enter test type' onChangeText={(e) => {
                            setState({ ...state, testType: e });
                        }} style={styles.input} />
                    </View>
                    <View>
                        <Text style={styles.inputText}>Test Date</Text>
                        <Pressable onPress={() => {
                            console.log("maaan")
                            setState({ ...state, showTimePicker: true });
                        }} >
                            <TextInput placeholder='Enter date' editable={false} style={styles.input} value={state.date} />
                        </Pressable>
                        {state.showTimePicker && state.showTimePicker === true && <DateTimePicker
                            testID="dateTimePicker2"
                            value={state && state.testDateActual ? state.testDateActual : new Date()}
                            mode={'date'}
                            is24Hour={false}
                            display="default"
                            onChange={(e, d) => {
                                if (d) {

                                    const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                                    console.log(date);
                                    setState({ ...state, date: date, showTimePicker: false })
                                }
                            }}
                        />
                        }
                    </View>
                    <View>

                        <Text style={styles.inputText}>Hospital/Lab name</Text>
                        <TextInput placeholder='Enter hospital or lab name' onChangeText={(e) => {
                            setState({ ...state, hospital: e });
                        }} style={styles.input} />

                        <View style={{ position: 'absolute', right: 10, bottom: 17 }}>
                            <Ionicons name={'location-sharp'} size={25} color={BACKGROUND.primary} ></Ionicons>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputText}>Symptoms/Notes</Text>
                        <TextInput onChangeText={(e) => {
                            setState({ ...state, notes: e });
                        }} multiline={true} numberOfLines={4} placeholder='Add additional notes here...' style={[styles.input, { textAlignVertical: 'top', paddingTop: 17 }]} />
                    </View>
                    <View>
                        <Text style={styles.errorText}>{state.error}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => submit()}  >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default AddMedicalRecords;
const styles = StyleSheet.create({
    inputText: {
        color: BACKGROUND.primary,
        fontWeight: 'bold',
        marginLeft: 5,
        marginVertical: 10

    },
    errorText: {
        marginVertical: 10,
        textAlign: 'center',
        color: 'black'
    },
    input: {
        marginBottom: 7,
        borderRadius: 10,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#ECECEC',
        color: 'gray'
    },
    button: {
        width: "60%",
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: BACKGROUND.primary,
        backgroundColor: BACKGROUND.primary,
        marginBottom: 10
    },
    buttonText: {
        // fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    }
})