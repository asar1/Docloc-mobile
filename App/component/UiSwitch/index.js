import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import SwitchToggle from "react-native-switch-toggle";
import { BACKGROUND, TEXT } from "../../helper/Color";
import { SCREEN } from "../../helper/Constant";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchOn1: false,
            switchOn2: false,
            switchOn4: false
        };
    }

    getButtonText() {
        return this.state.switchOn4 ? "Patient" : "Doctor";
    }

    getRightText() {
        return this.state.switchOn4 ? "" : "Patient";
    }

    getLeftText() {
        return this.state.switchOn4 ? "Doctor" : "";
    }

    render() {
        return (
            <View style={styles.container}>
                <SwitchToggle
                    buttonText={this.getButtonText()}
                    backTextRight={this.getRightText()}
                    backTextLeft={this.getLeftText()}
                    type={1}
                    buttonStyle={[{
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute"
                    }, styles.button, styles.selected]}
                    rightContainerStyle={[{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }, !this.state.switchOn4]}
                    leftContainerStyle={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}
                    buttonTextStyle={{ fontSize: 20 }}
                    textRightStyle={{ fontSize: 20 }}
                    textLeftStyle={{ fontSize: 20 }}
                    containerStyle={{
                        marginTop: 16,
                        width: 218,
                        height: 34,
                        borderRadius: 17,
                        padding: 0.1,
                        elevation: 4,
                        backgroundColor: 'white'
                    }}
                    backgroundColorOn="#fff"
                    backgroundColorOff="#fff"
                    circleStyle={{
                        width: 100,
                        height: 55,
                        borderRadius: 27.5,
                        backgroundColor: "blue" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn4}
                    onPress={this.onPress4}
                    circleColorOff="#e5e1e0"
                    circleColorOn="#e5e1e0"
                    duration={500}
                />
            </View>
        );
    }
    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    };
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    };
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
    };
    onPress4 = () => {
        this.setState({ switchOn4: !this.state.switchOn4 });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    button: {
        height: 34, width: 109, borderRadius: 17, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.29, shadowRadius: 4, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center'
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
    selected: {
        backgroundColor: BACKGROUND.primary,
        zIndex: 1000
    }
});