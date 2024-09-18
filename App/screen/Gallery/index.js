import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SCREEN } from '../../helper/Constant';

const attachements = [ 
    'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
    'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
    'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
    'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*',
    'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*'
]

const IMAGE_SIZE = 80;
const SPACING = 10;

export default Gallery = (props) => {

    const [focuedIndex, setFocuedIndex] = useState(0);
    const topRef = React.useRef();
    const bottomRef = React.useRef();

    const setCurrentIndex = (index) => {

        setFocuedIndex(index);

        topRef?.current?.scrollToOffset({
            offset: index * SCREEN.width,
            animated: true
        })

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > SCREEN.width / 2) {
            bottomRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - SCREEN.width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        }
        else {
            bottomRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }

    return (
        <View style={styles.container} >
            {console.log('---------------------',props.route.params.attachments )}
            <FlatList
                ref={topRef}
                data={props.route.params.attachments ? props.route.params.attachments : attachements}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                    setCurrentIndex(Math.ceil(e.nativeEvent.contentOffset.x / SCREEN.width))
                }}
                renderItem={({ item }) => {
                    return <Image
                        source={{ uri: item }}
                        style={styles.fullImage}
                    />
                }}
            />

            <FlatList
                ref={bottomRef}
                data={props.route.params.attachments ? props.route.params.attachments : attachements}
                horizontal={true}
                style={{ position: 'absolute', bottom: IMAGE_SIZE }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity
                        onPress={() => {
                            setCurrentIndex(index)
                        }}
                    >
                        <Image
                            source={{ uri: item }}
                            style={[styles.thumnailImage, index === focuedIndex ? { borderWidth: 2, borderColor: 'black' } : {}]}
                        />
                </TouchableOpacity>
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fullImage: {
        flex: 1,
        resizeMode: 'stretch',
        height: SCREEN.height,
        width: SCREEN.width
    },
    thumnailImage: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
        borderRadius: 12,
        marginRight: SPACING
    }
})