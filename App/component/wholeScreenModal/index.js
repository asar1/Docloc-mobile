import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { BACKGROUND, TEXT } from "../../helper/Color";
import Icon from 'react-native-vector-icons/AntDesign';

const SmallPopUp = (props) => {

    return (
        <View style={styles.centeredView}>
            {props &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={props.showStatusUpdate}
                    onRequestClose={() => {
                        props.onStatusPressed();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={{
                            backgroundColor: 'rgba(52, 52, 52, 0.5)', width: '100%', height: '100%', justifyContent: "center",
                            alignItems: "center",
                        }} >


                            <View style={styles.modalView}>
                                <View style={{ borderBottomColor: '#C9CACC', borderBottomWidth: 1, width: '100%' }}>
                                    <Text style={styles.modalHeaderText}>Update Appoinment Status</Text>
                                </View>
                                <View style={{ borderBottomColor: '#C9CACC', borderBottomWidth: 1, width: '100%', paddingVertical: 10 }}>
                                    <Pressable onPress={() => {
                                        props.onChangeStatus('I am not available.');
                                    }} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                                        <Icon name={'checkcircle'} color={props.status.text === "I am not available." ? BACKGROUND.primary : '#C9CACC'} size={18} style={{ marginLeft: 15 }} />
                                        <Text style={styles.modalContentText}>I am not available.</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        props.onChangeStatus('Patient not available.');
                                    }} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                                        <Icon name={'checkcircle'} color={props.status.text === "Patient not available." ? BACKGROUND.primary : '#C9CACC'} size={18} style={{ marginLeft: 15 }} />
                                        <Text style={styles.modalContentText}>Patient not available.</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        props.onChangeStatus('Appoinment completed.');
                                    }} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                                        <Icon name={'checkcircle'} color={props.status.text === "Appoinment completed." ? BACKGROUND.primary : '#C9CACC'} size={18} style={{ marginLeft: 15 }} />
                                        <Text style={styles.modalContentText}>Appoinment completed.</Text>
                                    </Pressable>
                                    <Pressable onPress={() => {
                                        props.addMedicalRecord();
                                    }} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
                                        <Icon name={'checkcircle'} color={props.status.text === "Bs youn hi." ? BACKGROUND.primary : '#C9CACC'} size={18} style={{ marginLeft: 15 }} />
                                        <Text style={styles.modalContentText}>Add medical record.</Text>
                                    </Pressable>

                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Pressable
                                        style={[styles.buttonClose, { borderBottomLeftRadius: 15 }]}
                                        onPress={() => props.onStatusPressed()}
                                    >
                                        <Text style={[styles.textStyle, , { color: BACKGROUND.primary }]}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.buttonClose, styles.buttonUpdate]}
                                        onPress={() => props.updateAppointmentStatus()}
                                    >
                                        <Text style={[styles.textStyle, { color: 'white' }]}>Update</Text>
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            }</View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "white",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16,
        color: BACKGROUND.primary,
        paddingVertical: 10,
        width: '50%',
    },
    buttonUpdate: {
        backgroundColor: BACKGROUND.primary,
        color: 'white',
        borderBottomRightRadius: 15
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalHeaderText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16,
        color: BACKGROUND.primary,
        paddingVertical: 10
    },
    modalContentText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: TEXT.time,
        padding: 5,
        marginLeft: 10,
        alignContent: 'center'
    }
});

export default SmallPopUp;