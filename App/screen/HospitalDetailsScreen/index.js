import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
// import '../.././assets/poppins';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import map from '../../assets/map.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BACKGROUND, TEXT } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
class HospitalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 3.5,
            title: 'Ashwini Eye Clinic',
            text: "i've been trying to render my Gifs animations on javascript based website and still i don't know what to do with it",
            pic: "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
            map: map,
            name: 'Andheri East',
            comments: '80',
            seens: '200',
        }
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (

            <View style={{ backgroundColor: '#F5F5F5' }} >
                <ScrollView style={{ marginBottom: 10 }} >
                    <View style={{ height: 200, width: '100%' }}>
                        <Image style={{ height: 250 }} source={{ uri: this.state.pic }} />
                        <View style={{ height: '15%', backgroundColor: 'transparent', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, position: 'absolute', top: 25 }}>
                            <CustomHeader paddingTop={25} paddingBottom={20} left="Skip" type="icon" leftPress={() => this.props.navigation.goBack()} color={TEXT.primary} iconName="arrowleft" inFrontOfLeft="Find & Book" bgColor={'transparent'} inFrontOfLeftStyle={styles.headerTitle} width={'80%'} />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardHeading}>{this.state.title}</Text>
                        <View style={{ paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: '-2%' }}>
                                <Entypo name={'location-pin'} color={'#626cfe'} size={22} />
                                <Text style={{ color: '#898a8f', fontSize: 17 }}>
                                    {this.state.name}
                                </Text>
                            </View>
                            <View style={{ width: 130, marginTop: 10 }}>
                                <StarRating
                                    disabled={false}
                                    // emptyStar={'ios-star-outline'}
                                    // fullStar={'ios-star'}
                                    // halfStar={'ios-star-half'}
                                    // iconSet={'Ionicons'}
                                    starSize={22}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={'#efce4a'}
                                >
                                </StarRating>
                            </View>
                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginTop: 20 }} >
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 5 }}>
                                <Text style={{ color: 'red' }}>CLOSED TODAY</Text>
                                <Text>9:30AM - 10PM</Text>
                                <Text style={{ color: '#3a58fc' }}>All Timing</Text>
                            </View>
                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1 }} />
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 20 }}>
                                <Entypo name={'location-pin'} color={'#1ca2cc'} size={20} />
                                <Text style={{ color: '#898a8f', fontSize: 13, marginTop: 2, marginLeft: 5 }}>
                                    92/6, 3rd Floor, Outer Ring Road, Chandra Layout
                            </Text>
                            </View>
                            <View style={{ paddingLeft: 10 }} >
                                <Image style={{ height: 150, alignSelf: 'center', width: '95%', borderRadius: 15, marginTop: 10, marginBottom: 20 }} source={this.state.map} />
                            </View>
                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1 }} />

                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 20 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                    <Image style={styles.avatar} source={{ uri: this.state.pic }} />
                                    <View style={{ flexDirection: 'column', paddingLeft: 10, marginTop: -5 }}>
                                        <Text style={{ fontSize: 20, marginVertical: 2 }}>{this.state.title}</Text>
                                        <Text style={{ color: '#898a8f', marginVertical: 2 }}>Dermat0logist</Text>
                                        <Text style={{ marginVertical: 2 }} >$80</Text>
                                    </View>

                                </View>
                                <View style={{ justifyContent: 'flex-end', paddingBottom: 20 }} >
                                    <TouchableOpacity style={{ width: 93, height: 30, borderRadius: 20, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1 }}>
                                        <Text style={{ color: '#3a58fc', textAlign: 'center' }}>Book</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1 }} />

                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 20 }}>
                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                    <Image style={styles.avatar} source={{ uri: this.state.pic }} />
                                    <View style={{ flexDirection: 'column', paddingLeft: 10, marginTop: -5 }}>
                                        <Text style={{ fontSize: 20, marginVertical: 2 }}>{this.state.title}</Text>
                                        <Text style={{ color: '#898a8f', marginVertical: 2 }}>Dermat0logist</Text>
                                        <Text style={{ marginVertical: 2 }} >$80</Text>
                                    </View>

                                </View>
                                <View style={{ justifyContent: 'flex-end', paddingBottom: 20 }} >
                                    <TouchableOpacity style={{ width: 93, height: 30, borderRadius: 20, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1 }}>
                                        <Text style={{ color: '#3a58fc', textAlign: 'center' }}>Book</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, }} />

                            <View style={{ marginVertical: 20, marginLeft: 30 }}>
                                <Text style={{ fontSize: 20, color: '#898a8f', }}>Services</Text>
                                <Text style={{ fontSize: 15, color: '#313450', marginTop: 10 }}>Ophthalmology</Text>
                                <Text style={{ fontSize: 15, color: '#313450', marginTop: 2 }}>Glaucoma</Text>
                                <Text style={{ fontSize: 15, color: '#313450', marginTop: 2 }}>Cataract</Text>
                                <Text style={{ fontSize: 15, color: '#3a58fc', marginTop: 10, }}>All Services</Text>
                            </View>
                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginVertical: 10 }} />
                            <View style={{ marginVertical: 20, marginLeft: 30 }}>
                                <Text style={{ fontSize: 15, color: '#898a8f', }}>FEEDBACK</Text>
                                <Text style={{ fontSize: 15, color: '#313450', marginTop: 10 }}>Very good . courteous and efficient staff.</Text>
                                <Text style={{ fontSize: 15, color: '#898a8f', marginTop: 2 }}>Jitu Raut . 2 years ago</Text>
                                <Text style={{ fontSize: 15, color: '#3a58fc', marginTop: 10, }}>All FEEDBACK</Text>
                            </View>
                            <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginVertical: 10 }} />
                            {/* <TouchableOpacity style={{ width: 200, height: 60, borderRadius: 50, justifyContent: 'center', backgroundColor: '#3a58fc', top: 0, alignSelf: 'flex-end' }}>
                                <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white', fontSize: 20 }}>Book</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        padding: 20,
        elevation: 2,
        width: '94%',
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',

    },
    cardHeading: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white'

    },
    avatar: {
        height: 45,
        width: 45,
        borderRadius: 50
    },
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        color: TEXT.primary,
        fontSize: 18
    }
})
export default HospitalDetails;