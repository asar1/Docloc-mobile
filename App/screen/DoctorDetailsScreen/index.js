import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import map from '../../assets/map.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BACKGROUND, TEXT } from '../../helper/Color';
import CustomHeader from '../../component/CustomHeader';
import Route from '../../Network/route';
import { BASE_URL, SCREEN_NAMES } from '../../helper/Constant';
import Loader from '../../component/Loader';

const route = new Route(BASE_URL);
class DoctorDetailsScreen extends Component {
    _unsubscribe = null;
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
            data: [{
                text: "very good. courteous and efficient staff",
                experinece: "1 years",
                stars: 1,
                name: "Jitu Raut"
            },
            {
                text: "very good. courteous and efficient staff very good. courteous and efficient staff very good. courteous and efficient staff very good. courteous and efficient staff",
                experinece: "2 years",
                stars: 4.5,
                name: "Jitu Raut"
            }],
            doctor: {},
            loading: false,
            showAll: false
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const params = this.props.route.params;
            this.getDoctor(params.doctorId)
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    // componentDidMount() {
    //     const params = this.props.route.params;
    //     console.log(params, 'params');
    // }

    loadMore = () => {
        alert('load more')
        const nextItems = this.state.data.slice(this.state.data.length, this.state.data.length + 1);
        this.setState({ data: [...this.state.data, ...nextItems] });
    }

    getDoctor = (doctorId) => {
        console.log(doctorId, 'doctorId');
        this.setState({ loading: true });
        route.get(`user/doctor-full-profile?userId=${doctorId}&date=${new Date()}`)
            .then(res => {
                this.setState({ loading: false });

                if (res.status) {
                    this.setState({ doctor: res.data });
                }
                else {
                    Alert.alert("Error", JSON.stringify(res.message))
                }
            })
            .catch(err => {
                this.setState({ loading: false });
                Alert.alert("Error", JSON.stringify(res.message))
            });
    }
    render() {
        const dataToShow = this.state.showAll ? this.state.data : this.state.data.slice(0, 5);
        return (
            <View style={{ backgroundColor: '#F5F5F5', flex: 1 }} >
                {console.log(this.doctor, 'doctor')}
                {this.state.loading !== true && this.state.doctor && this.state.doctor.user && <ScrollView>
                    <View style={{ paddingTop: 25, paddingHorizontal: 20, backgroundColor: BACKGROUND.primary }} >
                        <AntDesign onPress={() => this.props.navigation.goBack()} name={"arrowleft"} color={TEXT.primary} size={22} />
                    </View>
                    {console.log(this.state.doctor, 'doctor')}
                    <View style={{ height: '15%', backgroundColor: BACKGROUND.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        {/* <CustomHeader paddingTop={25} paddingBottom={20} left="Skip" type="icon" leftPress={() => this.props.navigation.goBack()} color={TEXT.primary} iconName="arrowleft" bgColor={BACKGROUND.primary} /> */}
                    </View>

                    <View style={[{ width: '100%', height: '85%' }, this.state.data.length > 0 ? { marginBottom: '45%' } : {}]}>
                        <View style={[styles.doctorCard]}>
                            <View style={{ backgroundColor: BACKGROUND.primary }}>

                                <Image style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white', alignSelf: 'center', zIndex: 100 }}
                                    source={this.state.doctor.user.profileImg != '' ? { uri: this.state.doctor.user.profileImg } : require('../../assets/default.jpg')} />
                                <View style={{ height: 50, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: -50 }}>

                                </View>
                            </View>
                            <View style={[{ padding: 20, paddingHorizontal: 40, marginTop: -50, elevation: 6 }, styles.doctorBox]} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#27ae60', marginTop: 10 }}>Prime</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <AntDesign style={{ marginRight: 10 }} name={'star'} size={15} color={'#efce4a'} />
                                        <Text>{this.state.doctor.user.rating}</Text>
                                    </View>
                                </View>
                                <View style={{ alignSelf: 'center', marginTop: '7%' }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>Dr {this.state.doctor.user.firstName} {this.state.doctor.user.lastName}</Text>
                                    <Text style={{ color: 'gray', lineHeight: 25 }}>{this.state.doctor.user.bio}</Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 20, paddingHorizontal: 20 }}>
                                <Text>{this.state.doctor.user.experience}<Text style={{ color: 'gray' }}> yrs. Experience</Text></Text>
                                {/* <Text>89%<Text style={{ color: 'gray' }}> (4384 votes)</Text></Text> */}
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{ paddingVertical: 5, marginTop: 60, }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                                    <Text style={{ color: 'gray', alignSelf: 'center' }}>In Clinic Fees :<Text style={{ color: 'black' }}> PKR {this.state.doctor.user.fee}</Text></Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(SCREEN_NAMES.DoctorBooking, { doctorId: this.state.doctor })} style={{ width: 100, height: 40, borderRadius: 50, justifyContent: 'center', borderColor: '#3a58fc', borderWidth: 1 }}>
                                        <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white', color: '#3a58fc' }}>Book</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginTop: 20 }} >
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 5 }}>
                                    <Text style={[this.state.doctor.available ? { color: '#27AE60' } : { color: 'red' }]}>{this.state.doctor.available ? "OPEN TODAY" : "CLOSED TODAY"}</Text>
                                    {/* <Text>9:30AM - 10PM</Text> */}
                                    <Text onPress={() => this.props.navigation.navigate(SCREEN_NAMES.DoctorBooking, { doctorId: this.state.doctor })} style={{ color: '#3a58fc', fontWeight: 'bold' }}>View Schedule</Text>
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

                                <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginTop: -15 }} />

                                {/* <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, }} /> */}
                                <View style={{ marginVertical: 20, marginLeft: 30, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, color: '#898a8f', }}>FEEDBACK</Text>
                                    <SafeAreaView style={{ flex: 1 }}>
                                        <FlatList style={{ flex: 1 }}
                                            data={dataToShow}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item }) =>
                                                <View style={{ paddingVertical: 20 }} >
                                                    <Text style={{ paddingRight: 10 }} >{item.text}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                        <Text style={{ color: '#898A8F' }} >{item.name}.{item.experinece}</Text>
                                                        <StarRating
                                                            starStyle={{ marginHorizontal: 3 }}
                                                            disabled={true}
                                                            // emptyStar={'ios-star-outline'}
                                                            // fullStar={'ios-star'}
                                                            // halfStar={'ios-star-half'}
                                                            // iconSet={'Ionicons'}
                                                            starSize={18}
                                                            maxStars={5}
                                                            rating={item.stars}
                                                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                            fullStarColor={'#efce4a'}
                                                        >
                                                        </StarRating>
                                                    </View>
                                                </View>
                                            }
                                            ListFooterComponent={() => <View style={{ flex: 1, bottom: 20 }}>
                                                <Text onPress={() => this.setState({ showAll: !this.state.showAll })} style={{ fontSize: 15, color: '#3a58fc' }}>{this.state.showAll ? 'Hide' : 'All Feedbacks'}</Text>
                                                <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginVertical: 10 }} />
                                                <View style={{ marginVertical: 20, marginLeft: 30 }}>
                                                    <Text style={{ fontSize: 15, color: '#898a8f', }}>SPECIALIZATION</Text>
                                                    <Text style={{ fontSize: 15, marginTop: 10 }}>{this.state.doctor.user.specialities.length > 0 && this.state.doctor.user.specialities[0].speciality}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate(SCREEN_NAMES.DoctorBooking, { doctorId: this.state.doctor })}
                                                    style={{ width: 200, height: 60, borderRadius: 50, justifyContent: 'center', alignContent: 'center', backgroundColor: '#3a58fc', alignSelf: 'center' }}>
                                                    <Text style={{ color: '#3a58fc', textAlign: 'center', color: 'white', fontSize: 20 }}>Book</Text>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        />
                                    </SafeAreaView>
                                </View>

                                {/* <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginVertical: 20 }} />
                                <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 10, backgroundColor: 'green', marginTop: 3 }} />
                                    <Text style={{ color: 'gray', marginLeft: 20 }}>VERIFICATION DONE FOR</Text>
                                </View> */}
                                {/* <Text style={{ marginHorizontal: 20, lineHeight: 25, marginTop: 10 }}>- Medical License</Text> */}
                                {/* <View style={{ width: "100%", backgroundColor: '#ececec', height: 1, marginVertical: 20 }} />
                                <Text style={{ marginHorizontal: 20, color: 'gray' }}>ALSO PRACTICES AT</Text>

                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 20 }}>
                                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                        <Image style={styles.avatar} source={{ uri: this.state.pic }} />
                                        <View style={{ flexDirection: 'column', paddingLeft: 10, marginTop: -5 }}>
                                            <Text style={{ fontSize: 20, marginVertical: 2 }}>{this.state.title}</Text>
                                            <Text style={{ color: '#898a8f', marginVertical: 2 }}>Dermat0logist</Text>
                                            <Text style={{ marginVertical: 2 }} >$80</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 20 }}>
                                            <AntDesign style={{ marginRight: 10 }} name={'star'} size={15} color={'#efce4a'} />
                                            <Text>4.2</Text>
                                        </View>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity style={{ justifyContent: 'center', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', marginTop: 10, marginRight: 20 }}>
                                            <AntDesign style={{ marginRight: 10 }} name={'star'} size={15} color={'#efce4a'} />
                                            <Text>4.2</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                 */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                }
                {this.state.loading && <Loader loadingText="Loading..." />}
            </View >
        )
    }
}
const styles = StyleSheet.create({
    card: {
        padding: 10,
        elevation: 3,
        width: '94%',
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginVertical: 20
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
    doctorCard: {
        width: '94%',
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: '-41%'
    },
    doctorBox: {
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.29, shadowRadius: 4
    },
})
export default DoctorDetailsScreen;