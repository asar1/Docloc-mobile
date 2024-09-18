import React, { useLayoutEffect, Fragment } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../component/CustomHeader";
import { BACKGROUND } from '../../helper/Color';

export default ({ route, navigation }) => {
    const { params } = route;
    const { img } = params;

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <Fragment>
            <View style={{backgroundColor: 'red'}} >
                <CustomHeader
                    left="Skip"
                    type="icon"
                    leftPress={goBack}
                    iconSize={30}
                    color={'white'}
                    iconName="close"
                    paddingTop={25}
                    paddingBottom={10}
                    bgColor={BACKGROUND.primary}
                />
            </View>
            {img ? (
                <Image
                    source={{ uri: img }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                />
            ) : (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                )}
        </Fragment>
    );
};
