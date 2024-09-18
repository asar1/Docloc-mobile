
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { BLACK, WHITE, ORANGE, GREEN, BLUE } from '../../helper/Color';
import Icon from 'react-native-vector-icons/Entypo';
import HealthInterustStyle from './HealthInterustStyle';



export default class HealthInterust extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <HealthInterustStyle.WrapperViewVertical>
                <HealthInterustStyle.TopView>
                    <HealthInterustStyle.HeaderView>
                        <Icon onPress={() => { this.props.navigation.goBack() }} name="cross" color={BLACK.dark} size={35} />
                        <HealthInterustStyle.HeaderText>Health Tips</HealthInterustStyle.HeaderText>
                    </HealthInterustStyle.HeaderView>
                </HealthInterustStyle.TopView>
            </HealthInterustStyle.WrapperViewVertical>
        );
    }
}