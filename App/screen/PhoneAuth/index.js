/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { BACKGROUND, TEXT } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import Loader from '../../component/Loader';
import { SCREEN_NAMES, TOKEN, USERDETAIL, USERID, USERROLE, MAIN_STACKS } from '../../helper/Constant';
import AsyncStorage from "@react-native-community/async-storage";
import Route from '../../Network/route';
import { BASE_URL } from '../../helper/Constant';
import { connect } from "react-redux";
import * as Types from "../../redux/actions/types";



const PhoneAuth = (props) => {
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const regexToValidatePhoneNumber = /^\+?([0-9]{2})\)?([0-9]{10})$/;
    const [cc, setCC] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberRef, setPhoneNumberRef] = useState(null);
    const [ccRef, setCCRef] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState({});
    const [num1Ref, setNum1Ref] = useState(React.createRef());
    const [num2Ref, setNum2Ref] = useState(React.createRef());
    const [num3Ref, setNum3Ref] = useState(React.createRef());
    const [num4Ref, setNum4Ref] = useState(React.createRef());
    const [num5Ref, setNum5Ref] = useState(React.createRef());
    const [num6Ref, setNum6Ref] = useState(React.createRef());
    const [actualCode, setActualCode] = useState('');
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('loading...');
    const [codeVerified, setCodeVerified] = useState(true);
    const route = new Route(BASE_URL);


    const goBack = () => {
        props.navigation.goBack();
    }

    const onChangeCC = (e) => {
        setCC(e);
        if (e.length > 2) {
            if (phoneNumberRef) {
                phoneNumberRef.focus();
            }
        }
        if ((e + phoneNumber).length === 13) {
            validatePhoneNumber(e + phoneNumber)
        }
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e);
        if ((cc + e).length === 13) {
            validatePhoneNumber(cc + e)
        }
    }

    const onAuthStateChanged = (user) => {
        if (initializing) setInitializing(false);
    }
    const onChangeCode = (e, index) => {
        if (e.length === 1) {
            let prop = `num${index}`;
            let previousCode = code;
            previousCode[prop] = e;
            setCode(previousCode);

            index = index + 1;

            switch (index) {
                case 1:
                    num2Ref.focus();
                    break;
                case 2:
                    num3Ref.focus();
                    break;
                case 3:
                    num4Ref.focus();
                    break;
                case 4:
                    num5Ref.focus();
                    break;
                case 5:
                    num6Ref.focus();
                    break;
                default:
                    break;
            }

            if (index === 6) {
                setActualCode(Object.values(previousCode).reduce((x, y) => x + y));
            }
        }
        else {
            switch (index) {
                case 1:
                    num1Ref.focus();
                    break;
                case 2:
                    num2Ref.focus();
                    break;
                case 3:
                    num3Ref.focus();
                    break;
                case 4:
                    num4Ref.focus();
                    break;
                case 5:
                    num5Ref.focus();
                    break;
                default:
                    num1Ref.focus();
                    break;
            }
            let prop = `num${index}`;
            let previousCode = code;
            previousCode[prop] = e;
            setCode(previousCode);
            setActualCode(Object.values(previousCode).reduce((x, y) => x + y));
        }
    }

    const validatePhoneNumber = (phoneNumber) => {
        setValidPhoneNumber(phoneNumber.match(regexToValidatePhoneNumber) ? true : false);
    }

    useEffect(() => {
        if (ccRef) {
            ccRef.focus();
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const sendCode = async () => {
        try {
            setLoading(true);
            setLoadingText("sending otp");
            auth().verifyPhoneNumber(cc + phoneNumber)
                .on('state_changed', (phoneAuthSnapshot) => {
                    setConfirm(phoneAuthSnapshot);
                    // switch (phoneAuthSnapshot.state) {
                    //     case auth().PhoneAuthState.CODE_SENT:
                    //         break;
                    //     case auth().PhoneAuthState.ERROR:
                    //         console.log('Error: ', phoneAuthSnapshot.error);
                    //         break;
                    // }
                });


            setLoading(false);
            setLoadingText("loading");
        } catch (error) {
            setLoading(false);
            setLoadingText("loading");
            console.log(error, 'error');
        }

    }

    const phoneSigin = async () => {
        route.post('auth/phonenosignin',
            JSON.stringify({ phoneNo: cc + phoneNumber }),
        ).then(async (res) => {
            if (res?.data === null) {
                props.navigation.navigate(SCREEN_NAMES.UpdateProfile, { params: { role: props.route.params.params.role, phoneNo: (cc + phoneNumber), from: "registeration" } })
            } else {
                props.setToken(res.data.token);
                props.setRole(
                    res.data.user.role === "user" ? "patient" : "doctor"
                );
                props.setUser(res.data.user);

                await AsyncStorage.setItem(TOKEN, res.data.token);
                await AsyncStorage.setItem(USERDETAIL, JSON.stringify(res.data));
                await AsyncStorage.setItem(USERID, res.data.user._id);

                await AsyncStorage.setItem(USERROLE, res.data.user.role === 'user' ? 'patient' : 'doctor');
                props.navigation.navigate(MAIN_STACKS.DrawerStack);
            }
        }).catch(error => alert(error.message))
    }

    const confirmCode = async () => {
        setLoading(true);
        setLoadingText("verifying otp");
        try {
            const credential = app.auth.PhoneAuthProvider.credential(
                confirm.verificationId,
                actualCode
            );
            auth().signInWithCredential(credential)
                .then(userCredential => {
                    // Navigate to other screen.
                    setCodeVerified(true);
                    phoneSigin()
                    // props.navigation.navigate(SCREEN_NAMES.UpdateProfile, { params: { role: props.route.params.params.role, phoneNo: (cc + phoneNumber), from: "registeration" } })
                })
                .catch(error => {
                    alert(error.message);
                    setCodeVerified(false);
                });
            setLoading(false);
            setLoadingText("loading");
        } catch (error) {
            setLoading(false);
            setLoadingText("loading")
        }
    }


    const submitPressed = () => {
        if (confirm) {
            if (actualCode.length === 6) {
                confirmCode();
            }
            else {
                Alert.alert("Error", "Please write the verification code");
            }
        }
        else {
            if ((cc + phoneNumber).length === 13 && validPhoneNumber) {
                sendCode();
            }
            else {
                Alert.alert("Error", "Entered phone number is not correct");
            }
        }
    }

    return (
        <View style={styles.container} >

            <CustomHeader paddingTop={25} left="Skip" type="icon" leftPress={goBack} color={'#313450'} iconName="close" bgColor={'transparent'} width={'80%'} />

            <View style={{ paddingTop: '10%', }} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    {confirm ? <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Enter code</Text>
                        <Text style={{ fontSize: 27, color: '#27AE60', fontWeight: 'bold' }} >* * * * * * </Text>
                    </View> : <Image
                        source={require('../../assets/phone_input.png')}
                    />}
                </View>
                <View style={{ paddingTop: '5%', }} >
                    {confirm ? <Text style={{ textAlign: 'center' }}>
                        We have sent you an SMS on {cc} {phoneNumber} {"\n"}
                        with 6 digit verification code.
                    </Text> : <Text style={{ textAlign: 'center' }}>
                        Enter your mobile number we will send {"\n"}
                        you the OTP to verify later
                    </Text>}
                </View>
                <ScrollView>
                    <View style={{ paddingTop: '15%', paddingHorizontal: '6%' }}>

                        <View style={{ backgroundColor: '#FFFFFF', height: '58%', minHeight: 180, borderRadius: 20 }}>
                            {confirm ?
                                <View style={{ flexDirection: 'row', paddingTop: '6%', paddingHorizontal: '5%', justifyContent: 'space-between' }} >
                                    <TextInput ref={(ref) => setNum1Ref(ref)} value={num1Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 0)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                    <TextInput ref={(ref) => setNum2Ref(ref)} value={num2Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 1)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                    <TextInput ref={(ref) => setNum3Ref(ref)} value={num3Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 2)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                    <TextInput ref={(ref) => setNum4Ref(ref)} value={num4Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 3)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                    <TextInput ref={(ref) => setNum5Ref(ref)} value={num5Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 4)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                    <TextInput ref={(ref) => setNum6Ref(ref)} value={num6Ref._lastNativeText} keyboardType='numeric' maxLength={1} onChangeText={(e) => onChangeCode(e, 5)} textAlign={'center'} style={{ borderBottomColor: '#C9C9C9', borderBottomWidth: 1, height: 46, width: '16.6%', borderRadius: 10, color: 'black' }} />
                                </View>
                                : <View style={{ flexDirection: 'row', paddingTop: '6%', paddingHorizontal: '5%', justifyContent: 'space-between' }} >
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', width: '13%' }} >
                                        <TextInput ref={(ref) => setCCRef(ref)}
                                            value={cc} keyboardType="phone-pad"
                                            maxLength={3} onChangeText={(e) => onChangeCC(e)}
                                            placeholder="+92" textAlign={'center'}
                                            style={{
                                                borderColor: '#ECECEC',
                                                borderWidth: 1,
                                                height: 46,
                                                width: '100%',
                                                borderRadius: 10,
                                                color: 'black',
                                            }} />

                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', width: '80%' }} >
                                        <TextInput ref={(ref) => setPhoneNumberRef(ref)} value={phoneNumber} keyboardType="phone-pad" onChangeText={(e) => onChangePhoneNumber(e)} placeholder="1234567891" maxLength={10} style={{ padding: 10, color: 'black', borderColor: '#ECECEC', borderWidth: 1, height: 46, width: '100%', borderRadius: 10 }} />
                                        {(cc + phoneNumber).length === 13 && validPhoneNumber && <View style={{ height: 22, width: 22, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: '#27AE60', borderRadius: 11, marginLeft: '-13%' }} >
                                            <MaterialIcons name="done" size={15} color={'white'} />
                                        </View>}
                                    </View>
                                </View>}
                            <Text style={[{ textAlign: 'center', paddingTop: '3%' }, codeVerified ? { color: 'white' } : { color: 'black' }]} >Entered otp is invalid.</Text>
                            <View style={{ paddingHorizontal: '5%', paddingTop: '6%' }} >
                                <TouchableOpacity onPress={() => submitPressed()} >
                                    <View style={{ height: 46, width: '100%', backgroundColor: BACKGROUND.primary, borderRadius: 23, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: TEXT.primary }}>Submit</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>

                </ScrollView>
                {confirm && <View style={{ paddingTop: '5%' }} >
                    <Text style={{ textAlign: 'center' }}>
                        Did not receive the code?
                    </Text>
                    <Text onPress={() => sendCode()} style={{ textAlign: 'center', marginTop: '4%', fontSize: 12, color: BACKGROUND.primary, fontWeight: 'bold' }}>
                        Re-send
                    </Text>
                </View>}
            </View>
            {loading && <Loader loadingText={loadingText} />}
        </View >
    );
}

function mapStateToProps(state, props) {
    return {
        userDetail: state.user.userDetail,
        userToken: state.user.userToken,
    };
}

const mapDispatchToProps = (dispatch) => ({
    setToken: (token) =>
        dispatch({
            type: Types.SET_TOKEN,
            payload: {
                token,
            },
        }),
    setRole: (role) =>
        dispatch({
            type: Types.SET_ROLE,
            payload: {
                role,
            },
        }),
    setUser: (userDetails) =>
        dispatch({
            type: Types.SET_USER,
            payload: {
                userDetails,
            },
        }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(PhoneAuth);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6'
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
    },
    availableDays: {
        flexDirection: 'row',
        paddingTop: 20
    },
    heading: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: TEXT.secondary
    },
    slotHeading: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: BACKGROUND.primary
    },
    availableDay: {
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: TEXT.primary
    },
    availableDayWrapper: {
        height: 37,
        width: 37,
        backgroundColor: BACKGROUND.primary,
        borderRadius: 18.5,
        marginLeft: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    isAvailableWrapper: {
        backgroundColor: BACKGROUND.disabled,
    },
    appointmentSlotSection: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0
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