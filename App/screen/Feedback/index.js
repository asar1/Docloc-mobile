import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BACKGROUND } from '../../helper/Color';
class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    text: "very good. courteous and efficient staff",
                    experinece: "Jitu Raut. 2 years",
                    stars: "1",
                },
                {
                    text: "very good. courteous and efficient staff very good. courteous and efficient staff very good. courteous and efficient staff very good. courteous and efficient staff",
                    experinece: "Jitu Raut. 2 years",
                    stars: "5",
                },
            ]
        }
    }
    onStarRatingPress(rating) {
        this.setState({
            star: rating
        });
    }
    render() {
        return (
            <View style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
                <View style={{ width: '100%', height: "12%", backgroundColor: BACKGROUND.primary, justifyContent: 'center', borderBottomStartRadius: 25, borderBottomEndRadius: 25 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
                        <AntDesign style={{ marginTop: 0 }} name={'arrowleft'} color={'white'} size={22} />
                        <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Feedback</Text>
                    </View>

                </View>
                <FlatList style={{ flex: 1, marginHorizontal: 20, }}
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    renderItem={({ item }) =>
                        <View style={styles.card}>
                            <Text>{item.text}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text>{item.experinece}</Text>
                                <StarRating
                                starStyle={{marginHorizontal:3}}
                                    disabled={false}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    starSize={18}
                                    maxStars={5}
                                    rating={item.stars}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={'#efce4a'}
                                >
                                </StarRating>
                            </View>
                        </View>
                    }
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 20,
        width: "99%",
        alignSelf: 'center',
        elevation: 2,
        marginVertical: 10,
        backgroundColor: 'white'
    },

})
export default Feedback; 