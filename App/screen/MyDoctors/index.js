
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import MyDoctorsStyle from './MyDoctorsStyle';
import Icon from 'react-native-vector-icons/Entypo';
import { BLACK, WHITE, ORANGE, GREEN, BLUE, TEXT, BACKGROUND } from '../../helper/Color';
import { BASE_URL, MAIN_STACKS, SCREEN_NAMES } from "../../helper/Constant";
import Route from "../../Network/route";
import { connect } from "react-redux";
const route = new Route(BASE_URL);
import Loader from "../../component/Loader";
import CustomHeader from "../../component/CustomHeader/index"

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

class MyDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // doctorList: [
            //     {
            //         profileImage: require('../../assets/item_1.png'),
            //         firstname: 'Rejina',
            //         lastname: 'Freak',
            //         education: 'MBBS,DOMS,MS - Opthalmology Opthalmolgist',
            //         experience: '26 years of experience',
            //         status: 'CLOSED TODAY'
            //     },
            //     {
            //         profileImage: require('../../assets/item_2.png'), firstname: 'Selin',
            //         lastname: 'Jose', education: 'MBBS,DOMS,MS - Opthalmology Opthalmolgist', experience: '26 years of experience', status: 'OPEN TODAY'
            //     },
            //     {
            //         profileImage: require('../../assets/item_3.png'), firstname: 'Selin',
            //         lastname: 'Jose', education: 'MBBS,DOMS,MS - Opthalmology Opthalmolgist', experience: '26 years of experience', status: 'CLOSED TODAY'
            //     }
            // ],
            doctorList: [],
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })

        if (this.props.user.userRole === "patient") {
            await this.getMyDoctors();
        }

        if (this.props.user.userRole === "doctor") {
            await this.getMyPatients();
        }

        this.setState({ loading: false })
    }

    getMyDoctors() {

        const tempUser = JSON.parse(this.props.user.userDetail.userDetails)

        route
            .getAuthenticated(`user/my-doctors/${tempUser.user._id}/${new Date()}`, this.props.user.userToken)
            .then((res) => {
                console.log(res, 'this is res')
                if (res.status === 0) {
                    Alert.alert("Error", JSON.stringify(res.message));
                } else {

                    this.setState({ doctorList: res.data });
                    console.log('res data', res.data)
                }
            })
            .catch((error) => alert(JSON.stringify(error)));
    }

    getMyPatients() {
        const tempUser = JSON.parse(this.props.user.userDetail.userDetails)
        route
            .getAuthenticated(`user/my-patients/${tempUser.user._id}`, this.props.user.userToken)
            .then((res) => {
                console.log(res, 'this is res')
                if (res.status === 0) {
                    Alert.alert("Error", JSON.stringify(res.message));
                } else {

                    this.setState({ doctorList: res.data });
                    console.log('res data', res.data)
                }
            })
            .catch((error) => alert(JSON.stringify(error)));
    }
    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView showsVerticalScrollIndicator={false}>
                <MyDoctorsStyle.WrapperViewVertical>
                    <MyDoctorsStyle.TopView>
                        <CustomHeader paddingTop={25} paddingBottom={0} left="Skip" type="icon" leftPress={this.goBack} color={TEXT.primary} iconName="close" inFrontOfLeft={this.props.user.userRole === "patient" ? "My Doctors" : "My Patients"} bgColor={'transparent'} inFrontOfLeftStyle={styles.headerTitle} width={'80%'} />
                        {/* <MyDoctorsStyle.HeaderView>
                        <Icon style={{ marginTop: 10 }} onPress={() => { this.props.navigation.goBack() }} name="cross" color={TEXT.primary} size={40} />
                        <MyDoctorsStyle.HeaderText>My Doctor</MyDoctorsStyle.HeaderText>
                    </MyDoctorsStyle.HeaderView> */}
                    </MyDoctorsStyle.TopView>
                    {this.props.user.userRole === "patient" && <MyDoctorsStyle.FlatListView>
                        <View style={{ height: 350 }}>
                            <FlatList style={{ height: 100 }}
                                data={this.state.doctorList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <MyDoctorsStyle.TouchableOpacityView>
                                        <MyDoctorsStyle.innerTopView>
                                            <MyDoctorsStyle.ImageView source={item.doctor.profileImg = '' ? { uri: item.doctor.profileImg } : require('../../assets/default.jpg')} />
                                            <MyDoctorsStyle.profileTextView>
                                                <MyDoctorsStyle.profileName>{item.doctor.firstName}{item.doctor.lastName}</MyDoctorsStyle.profileName>
                                                <MyDoctorsStyle.profileDescriptionView>
                                                    <MyDoctorsStyle.profileEducation>{item.doctor.bio}</MyDoctorsStyle.profileEducation>
                                                    <MyDoctorsStyle.profileEducation>Ophthalmologist</MyDoctorsStyle.profileEducation>
                                                    <MyDoctorsStyle.profileEducation>{item.doctor.experience}</MyDoctorsStyle.profileEducation>
                                                </MyDoctorsStyle.profileDescriptionView>
                                            </MyDoctorsStyle.profileTextView>
                                        </MyDoctorsStyle.innerTopView>
                                        <MyDoctorsStyle.innerBottomView>
                                            <MyDoctorsStyle.profileStatus style={{ color: item.available === false ? 'red' : 'green' }}>{item.available ? "OPEN TODAY" : "CLOSED TODAY"}</MyDoctorsStyle.profileStatus>
                                            {/* <MyDoctorsStyle.profileTime> {item.openingHours.toUpperCase()} </MyDoctorsStyle.profileTime> */}
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate(SCREEN_NAMES.ChatSpecific, {
                                                    img: item.doctor.profileImg,
                                                    name: item.doctor.firstName + ' ' + item.doctor.lastName,
                                                    userId: item.doctor._id,
                                                    from: "patient"
                                                });
                                            }}>
                                                <MyDoctorsStyle.MessageImage source={require('../../assets/message_icon.png')} />
                                            </TouchableOpacity>
                                        </MyDoctorsStyle.innerBottomView>
                                    </MyDoctorsStyle.TouchableOpacityView>
                                )}
                            />
                        </View>
                    </MyDoctorsStyle.FlatListView>
                    }

                    {this.props.user.userRole === "doctor" && <View>
                        <View>
                            <View style={{ height: 100, marginHorizontal: 20, marginTop: -135 }}>
                                <FlatList
                                    nestedScrollEnabled
                                    data={this.state.doctorList}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={{ backgroundColor: 'white', borderRadius: 20, marginVertical: 10 }}>
                                            <View style={{ flexDirection: 'row', padding: 10, paddingTop: -5 }}>
                                                <MyDoctorsStyle.ImageView source={item.doctor.profileImg = '' ? { uri: item.doctor.profileImg } : require('../../assets/default.jpg')} />
                                                <MyDoctorsStyle.profileTextView>
                                                    <View style={{ paddingTop: 17 }}>
                                                        <MyDoctorsStyle.profileName>{item.patient.firstName} {item.patient.lastName}</MyDoctorsStyle.profileName>
                                                    </View>
                                                    <Text style={{ paddingTop: 5, fontSize: 10, color: 'gray' }}>Last appoinment: {new Date(item.createdAt).getDate() + '-' + months[new Date(item.createdAt).getMonth() + 1] + '-' + new Date(item.createdAt).getFullYear()} </Text>
                                                </MyDoctorsStyle.profileTextView>
                                            </View>

                                            <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 20 }} onPress={() => {
                                                this.props.navigation.navigate(SCREEN_NAMES.ChatSpecific, {
                                                    img: item.patient.profileImg,
                                                    name: item.patient.firstName + ' ' + item.patient.lastName,
                                                    userId: item.patient._id,
                                                    from: "doctor"
                                                });
                                            }}>
                                                <MyDoctorsStyle.MessageImage source={require('../../assets/message_icon.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                    }
                    {this.state.loading && <Loader loadingText={"Loading..."} />}
                </MyDoctorsStyle.WrapperViewVertical>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        color: TEXT.primary,
        fontSize: 18,
        fontWeight: '700'
    }
});
function mapStateToProps(state, props) {
    return state;
}

const mapDispatchToProps = dispatch => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(MyDoctors);