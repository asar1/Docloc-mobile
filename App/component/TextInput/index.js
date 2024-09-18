import React from 'react';
import { View, ActivityIndicator, Text, TextInput } from 'react-native';
import { SCREEN } from '../../helper/Constant';
import { BLACK, WHITE, APPCOLOR, BACKGROUND } from '../../helper/Color';

const MyInput = (props) =>
    <TextInput
        style={{
            height: 49,
            width: SCREEN.width - 100,
            borderColor: WHITE.borderLight,
            alignSelf: 'center',
            paddingLeft: 10

        }}
        value={props.messageText}
        key="input"
        onChangeText={props.onChange}
        placeholder="Type a message"
        multiline={true}
        numberOfLines={3}
        selectionColor={BACKGROUND.primary}
    />
export default MyInput;