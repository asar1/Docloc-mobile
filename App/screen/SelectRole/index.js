import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { BACKGROUND, TEXT } from '../../helper/Color';
import Route from "../../Network/route";
import { BASE_URL } from "../../helper/Constant";
import AsyncStorage from "@react-native-community/async-storage";

const route = new Route(BASE_URL);

export default class SelectRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: "",
            doctor: "",
            selectedRemember: false,
            email: "",
            password: "",
            isLoading: false,
            userInfo: "",
        };
    }
    // facebookSignIn(role) {
    //     console.log(role, "role")
    //     this.setState({ isLoading: true });
    //     LoginManager.logInWithPermissions(["public_profile"]).then(
    //         (result) => {
    //             if (result.isCancelled) {
    //                 this.setState({ isLoading: false });
    //                 alert("Login was cancelled");
    //             } else {
    //                 AccessToken.getCurrentAccessToken().then((data) => {
    //                     console.log(data.accessToken.toString(), "this is access token");
    //                     console.log(data.userID.toString(), "this is user id");
    //                     let dataForRequest = {
    //                         accessToken: data.accessToken.toString(),
    //                         userID: data.userID.toString(),
    //                         role: role
    //                     };
    //                     route
    //                         .postdata("auth/facebooksignin", dataForRequest)
    //                         .then((res) => {
    //                             console.log(JSON.stringify(res), "this is response")
    //                             this.setState({ isLoading: false });
    //                             // AsyncStorage.setItem(TOKEN, res.data.token);
    //                             // AsyncStorage.setItem(USERDETAIL, JSON.stringify(res.data));
    //                             // AsyncStorage.setItem(USERID, res.data.user._id);
    //                             if (res.data.isProfileCompleted) {
    //                                 this.props.navigation.navigate("home")
    //                             } else {
    //                                 this.props.navigation.navigate("home");
    //                             }
    //                         })
    //                         .catch((error) => {
    //                             alert("Login failed with error: " + JSON.stringify(error))
    //                             this.setState({ isLoading: false });
    //                             console.log(error, "this is catch in error");
    //                         });
    //                 });
    //                 alert(
    //                     "Login was successful with permissions: " + JSON.stringify(result)
    //                 );
    //             }
    //         },
    //         (error) => {
    //             this.setState({ isLoading: false });
    //             alert("Login failed with error: " + error);
    //         }
    //     );
    // }
    // Eventhandler =(event) =>{
    //     this.setState({ patient: 'patient' },
    //     ()=>{
    //         console.log(event,'patient')
    //     });
    // }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: '28%' }} >
                    <View style={styles.TopAbsoluteView}>
                        <Text style={styles.heading}>i'm registering as</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', height: '61%' }}>
                    <TouchableOpacity
                    //onPress={() => this.facebookSignIn("user")}
                    >
                        <View style={styles.patientView}>
                            <View style={styles.icon}>
                                <FontAwesome name={'user-plus'} size={70} color={'white'} />
                            </View>
                            <View>
                                <Text style={styles.text}>Patient</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    //onPress={() => this.facebookSignIn("doctor")} 
                    >
                        <View style={styles.patientView}>

                            <Text style={styles.doctorText}>Doctor</Text>
                            <View style={styles.doctorIcon}>
                                <FontAwesome5 name={'user-md'} size={70} color={'white'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>

                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    TopAbsoluteView: {
        height: 472,
        width: 492,
        borderBottomLeftRadius: 230,
        borderBottomRightRadius: 250,
        backgroundColor: BACKGROUND.primary,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 125,
        paddingLeft: 20,
        position: 'absolute',
        top: -220,
        left: -60,
        marginRight: 40
    },
    heading: {
        color: TEXT.primary,
        fontSize: 35,
        fontWeight: 'bold'
    },

    patientView: {
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: '10%',
        justifyContent: 'space-between',
    },
    icon: {
        width: 120,
        height: 120,
        backgroundColor: BACKGROUND.primary,
        borderRadius: 60,
        justifyContent: 'center',
        padding: 20,

    },
    text: {
        fontSize: 40,
        color: BACKGROUND.primary,
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 30,
        fontWeight: '700',
        paddingTop: 40
    },
    doctorText: {
        paddingRight: 40,
        fontSize: 40,
        color: BACKGROUND.primary,
        justifyContent: 'center',
        padding: 10,
        fontWeight: '700',
        paddingTop: 30
    },
    doctorIcon: {
        width: 120,
        height: 120,
        backgroundColor: BACKGROUND.primary,
        borderRadius: 60,
        justifyContent: 'center',
        padding: 28
    },
    bottomView: {
        width: 200,
        height: 200,
        backgroundColor: BACKGROUND.primary,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -100,
        right: -80,
        borderRadius: 125,
    }
})