import React, { Component, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { BLUE, BACKGROUND } from '../../helper/Color';
import Route from "../../Network/route";
import { BASE_URL, TOKEN, USERDETAIL, USERID } from "../../helper/Constant";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from "react-native-gesture-handler";

const route = new Route(BASE_URL);

const DoctorBookFinal = (props) => {

    const [defaultState, setDefaultState] = useState({
        uri: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
        name: "Dr. jitendra Raut",
        bio: "B.se, MBBS, DDVL, MD-, Dermitol bsbsbsbsbsbsbsb",
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

    })

    return (
        // <View style={{height: 21, width: 98, marginTop: 100, justifyContent: 'center'}} >
        //     <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#FFFB91', '#FFA7F5']} style={styles.linearGradient}>
        //         <Text style={{textAlign: "center"}} >
        //             Morning
        //         </Text>
        //     </LinearGradient>
        // </View>
        <View style={{height:'100%'}}>
            <View style={styles.mainBg} >
                <View style={styles.headerText} >
                    <View style={[styles.backArrow, { flexDirection: 'row' }]} >
                        <Ionicons onPress={() => props.navigation.goBack()} name={'arrow-back'} size={22} color={"white"} ></Ionicons>
                        <Text style={{ marginLeft: 12, fontWeight: 'bold', marginTop: 2, color: 'white' }}>
                            Select a time slot
                        </Text>
                    </View>
                    {/* <View style={styles.backArrow} >
                        <Text style={{ marginLeft: 10, marginTop: 2, color: 'white' }} >
                            Pakistan
                        </Text>
                    </View> */}
                </View>
            </View>
            <View style={{ width: '92%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 20, marginTop: -105, padding: 25, paddingTop: 20, elevation: 5 }} >
                <View style={{ flexDirection: 'row' }} >

                    <Image style={{ height: 60, width: 60, borderRadius: 30, }} source={{ uri: defaultState.uri }} />
                    <View style={{ marginLeft: 20, marginTop: 8 }} >
                        <Text style={{ fontWeight: 'bold' }} > {defaultState.name} </Text>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: 'gray', width:'70%' }}> {defaultState.bio} </Text>
                    </View>

                </View>
                <View style={{ width: '100%', height: 0.3, backgroundColor: '#ececec', marginTop: 20 }} />
                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', marginBottom: 10 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <View>
                        <Text style={{ color: '#898a8f' }}>DATE & TIME</Text>
                        <Text style={{ color: '#313450', lineHeight: 20 }}>Tomorrow, 9 Dec</Text>
                        <Text style={{fontSize:13}}>4:45 PM</Text>
                    </View>
                    <View style={{ width: 1, height: '100%', backgroundColor: '#d6d6d6' }}>

                    </View>
                    <View>
                        <Text style={{ color: '#898a8f' }} >Consultation Fees</Text>
                        <Text style={{ marginRight: 80, lineHeight: 20 }}>$600</Text>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', marginTop: 10 }} />

                <View style={{ paddingTop: 30 }} >
                    <TextInput multiline={true} placeholder="Notes ( Optional )" style={{ justifyContent:'flex-start',height: 200, backgroundColor: '#F6F6F6', borderColor: '#D6D6D6', borderWidth: 0.9, borderRadius: 15, padding: 20,textAlignVertical:'top' }} ></TextInput>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop:17, marginBottom:10 }} >
                    <Text style={{ fontSize: 10, color: '#898a8f', marginLeft: 1,  }}>By booking this appointment you agree to the</Text><Text style={{ fontSize: 10, color: '#3CB9C7', marginLeft: 1, }} > T&C</Text>
                </View>
                {/* </View> */}
                {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 11 }}   >
                    <View elevation={5} style={{ height: 25, width: 25, elevation: 5, borderRadius: 12.5, backgroundColor: 'white', padding: 5, overflow: 'hidden' }} >
                        <Ionicons name={'chevron-back'} size={15} color={"black"} ></Ionicons>
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 5 }} > Today, {new Date().getDate()} {defaultState.months[new Date().getMonth()]} </Text>
                    <View elevation={5} style={{ height: 25, width: 25, elevation: 5, borderRadius: 12.5, backgroundColor: 'white', padding: 5, overflow: 'hidden' }} >
                        <Ionicons name={'chevron-forward'} size={15} color={"black"} ></Ionicons>
                    </View>

                </View> */}
                {/* <View>
                    <View style={{ height: 21, width: 98, zIndex: 1, marginLeft: 15, marginTop: 100, justifyContent: 'center', marginTop: 50, }} >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFFB91', '#FFA7F5']} style={styles.linearGradient}>
                            <Text style={{ textAlign: "center" }} >
                                Morning
                        </Text>
                        </LinearGradient>
                    </View>
                    <View style={{ marginTop: -11.5, display: 'flex', flexDirection: 'row', backgroundColor: '#FBFBFB', borderWidth: 0.3, borderColor: '#D6D6D6', padding: 20, paddingTop: 25, borderRadius: 10 }} >
                        {["10.00", "11.00", "12.00"].map((item) => {
                            return <Text style={{ marginRight: 20 }} >{item}</Text>
                        })}
                    </View>
                    <View style={{ height: 21, width: 98, zIndex: 1, marginLeft: 15, marginTop: 100, justifyContent: 'center', marginTop: 50, }} >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#E0CCFF', '#C1FFF1']} style={styles.linearGradient}>
                            <Text style={{ textAlign: "center" }} >
                                Afternoon
                        </Text>
                        </LinearGradient>
                    </View>
                    <View style={{ marginTop: -11.5, display: 'flex', flexDirection: 'row', backgroundColor: '#FBFBFB', borderWidth: 0.3, borderColor: '#D6D6D6', padding: 20, paddingTop: 25, borderRadius: 10 }} >
                        {["12.00", "01.00", "02.00", "03.00", "04.00"].map((item) => {
                            return <Text style={{ marginRight: 20 }} >{item}</Text>
                        })}
                    </View>
                    <View style={{ height: 21, width: 140, zIndex: 1, marginLeft: 15, marginTop: 100, justifyContent: 'center', marginTop: 50, }} >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#90E4FF', '#9FFFF5']} style={styles.linearGradient}>
                            <Text style={{ textAlign: "center" }} >
                                Evening & night
                        </Text>
                        </LinearGradient>
                    </View>
                    <View style={{ marginTop: -11.5, flexDirection: 'row', flexWrap:'wrap', backgroundColor: '#FBFBFB', borderWidth: 0.3, borderColor: '#D6D6D6', padding: 20, paddingTop: 25, borderRadius: 10 }} >
                        {["05.00", "06.00", "07.00", "08.00", "09.00", "10.00"].map((item) => {
                            return <Text style={{ marginRight: 20 }} >{item}</Text>
                        })}
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 180 }} >
                        <TouchableOpacity style={{ width: 186, height: 40, borderRadius: 50, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1, backgroundColor: '#3a58fc' }}>
                            <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white' }}>Book</Text>
                        </TouchableOpacity>
                    </View>

                </View> */}


            </View>
            <View style={{flex:1, justifyContent:'flex-end', marginBottom:30 }} >
                <TouchableOpacity onPress={() => props.navigation.navigate(home)} style={{ width: 175, height: 50, borderRadius: 50, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1, backgroundColor: '#3a58fc', alignSelf:'center',}}>
                    <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white', fontWeight:'bold' }}>Book</Text>
                </TouchableOpacity>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    mainBg: {
        backgroundColor: BACKGROUND.primary,
        height: '27%',
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
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
})

export default DoctorBookFinal;