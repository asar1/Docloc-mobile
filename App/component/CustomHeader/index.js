import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"

const CustomHeader = (props) => {
    const styles = StyleSheet.create({
        container: {
            paddingTop: props.paddingTop ? props.paddingTop : 0,
            paddingBottom: props.paddingBottom ? props.paddingBottom : 0,
            backgroundColor: props.bgColor,
            paddingHorizontal: 20,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center'
        },
        subContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center'
        }


    })

    return (

        <View style={styles.container} >
            {props.center ? <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }} >
                <Text style={props.centerStyle} >
                    {props.center}
                </Text>
            </View> : <View style={styles.subContainer}>
                <View style={{ width: props.width ? props.width : '45%', flexDirection: 'row', alignItems: 'center' }} >
                    {props.left && props.type === 'icon' &&
                        <AntDesign onPress={props.leftPress} name={props.iconName} color={props.color} size={props.iconSize ? props.iconSize : 22} />
                    }
                    {props.left && props.type === 'text' &&
                        <Text style={props.leftStyle} >{props.left}</Text>
                    }

                    {props.inFrontOfLeft && <Text style={[{ marginLeft: 10 }, props.inFrontOfLeftStyle]} >
                        {props.inFrontOfLeft}
                    </Text>}

                </View>

                <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'space-between' }} >
                    {props.center ? <Text style={{ textAlign: 'left' }} >
                        {props.center}
                    </Text> : <Text> </Text>}
                    {props.right && props.rightType !== 'icon' ? <Text style={props.rightTextStyle} onPress={props.onRightPress ? props.onRightPress : null} >
                        {props.right}
                    </Text> : props.rightType === 'icon' ? <AntDesign onPress={props.rightIconClick} name={props.rightIconName} color={props.rightIconColor} size={22} /> : <Text> </Text>}

                    {props.rightImage !== '' && props?.rightType == 'img' && <TouchableOpacity onPress={props.rightImageClick}>
                        <Image
                            style={{ width: 25, height: 25, borderRadius: 12.5, marginRight: 0, backgroundColor: 'white' }}
                            source={{ uri: props?.rightImage }} />
                    </TouchableOpacity>
                    }
                </View>

            </View>}
        </View>
    )


}



export default CustomHeader;