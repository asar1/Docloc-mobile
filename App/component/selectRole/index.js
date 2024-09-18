import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BACKGROUND, TEXT } from '../../helper/Color'

export default class SelectRole extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPressRole} style={this.props.currentRole === "user" ? [styles.round, styles.red, styles.selected, styles.button] : [styles.round, styles.red, styles.button]}>
                    <Text style={this.props.currentRole === "user" ? styles.selectedText : styles.text} >Patient</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onPressRole} style={this.props.currentRole === "doctor" ? [styles.round, styles.selected, styles.button] : [styles.round, styles.button]}>
                    <Text style={this.props.currentRole === "doctor" ? styles.selectedText : styles.text} >Doctor</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    button: {
        height: 34, width: 109, borderRadius: 17, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.29, shadowRadius: 4, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'
    },
    red: {
        position: 'absolute',
        top: 0,
        left: 95,
        zIndex: 2
    },
    text: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: BACKGROUND.primary,
        fontWeight: '700'
    },
    selectedText: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: TEXT.primary,
        fontWeight: '700'

    },
    green: {
        position: 'absolute',
        top: 0,
        left: 80,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        borderRadius: 50,
        elevation: 4,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 180,
    },
    selected: {
        backgroundColor: BACKGROUND.primary,
        zIndex: 1000
    }

});
