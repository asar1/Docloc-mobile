import React, { Component, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { BLUE } from '../../helper/Color';
import Route from "../../Network/route";
import { BASE_URL, TOKEN, USERDETAIL, USERID } from "../../helper/Constant";
import Ionicons from 'react-native-vector-icons/Ionicons';
import  LinearGradient  from 'react-native-linear-gradient';

const route = new Route(BASE_URL);

const DoctorBookSecond = (props) => {

    const [defaultState, setDefaultState] = useState({
        uri: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
        name: "Dr. jitendra Raut",
        bio: "B.se, MBBS, DDVL, MD-, Dermitol",
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
        <View>

            <View style={styles.mainBg} >
                <View style={styles.headerText} >
                    <View style={[styles.backArrow, { flexDirection: 'row' }]} >
                        <Ionicons onPress={() => props.navigation.goBack()} name={'arrow-back'} size={20} color={"white"} ></Ionicons>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 2, color: 'white' }}>
                            Select a time slot
                        </Text>
                    </View>
                    <View style={styles.backArrow} >
                        <Text style={{ marginLeft: 10, marginTop: 2, color: 'white' }} >
                            Pakistan
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ height: 790, width: '92%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 20, marginTop: -200, padding: 25, paddingTop: 50, }} >
                <View style={{ flexDirection: 'row', justifyContent: "center" }} >

                    <Image style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: 'gray', bottom: 20 }} source={{ uri: defaultState.uri }} />
                    <View style={{ marginLeft: 20, marginTop: 8 }} >
                        <Text style={{ fontWeight: 'bold' }} > {defaultState.name} </Text>
                        <Text > {defaultState.bio} </Text>
                    </View>

                </View>
                <View style={{ width: '100%', height: 0.3, backgroundColor: '#ececec' }} ></View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 11 }}   >
                    <View elevation={5} style={{ height: 25, width: 25, elevation: 5, borderRadius: 12.5, backgroundColor: 'white', padding: 5, overflow: 'hidden' }} >
                        <Ionicons name={'chevron-back'} size={15} color={"black"} ></Ionicons>
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 5 }} > Today, {new Date().getDate()} {defaultState.months[new Date().getMonth()]} </Text>
                    <View elevation={5} style={{ height: 25, width: 25, elevation: 5, borderRadius: 12.5, backgroundColor: 'white', padding: 5, overflow: 'hidden' }} >
                        <Ionicons name={'chevron-forward'} size={15} color={"black"} ></Ionicons>
                    </View>

                </View>
                <View>
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
                    <View style={{ marginTop: -11.5, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FBFBFB', borderWidth: 0.3, borderColor: '#D6D6D6', padding: 20, paddingTop: 25, borderRadius: 10 }} >
                        {["05.00", "06.00", "07.00", "08.00", "09.00", "10.00"].map((item) => {
                            return <Text style={{ marginRight: 20 }} >{item}</Text>
                        })}
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 180 }} >
                        <TouchableOpacity onPress={() => props.navigation.navigate("DoctorBookFinal")} style={{ width: 186, height: 40, borderRadius: 50, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1, backgroundColor: '#3a58fc' }}>
                            <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white' }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    mainBg: {
        backgroundColor: BLUE.blue,
        height: 300,
        width: '100%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50
    },
    backArrow: {
        margin: 20,
        marginTop: 50,
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

export default DoctorBookSecond;