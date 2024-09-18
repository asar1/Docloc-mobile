import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import { BACKGROUND, TEXT } from '../../helper/Color';
import { BASE_URL, SCREEN_NAMES } from '../../helper/Constant';
import Route from "../../Network/route";

const route = new Route(BASE_URL);

const alleryLevelColors = { High: '#C73535', Medium: '#FFCC00', Low: 'green' }

class MyAllergies extends Component {
    _unsubscribe = null;
    constructor(props) {
        super(props)
        this.state = {
            allergies: []
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    getAllergies = () => {
        let userId = this.props.route.params.id;
        if (userId) {
            route
                .getAuthenticated(`user/${userId}`, this.props.user.userToken)
                .then((res) => {
                    if (res.status === 0) {
                        Alert.alert("Error", JSON.stringify(res.message));
                    } else {
                        console.log(res, 'here you got response');
                        this.setState({ allergies: res.data.user.allergies })
                    }
                })
                .catch((error) => alert(JSON.stringify(error)));
        }
    }

    updateAllergy = (item) => {

        if (this.props.route.params.id == this.props.user.userDetail.userDetails._id) {
            this.props.navigation.navigate(SCREEN_NAMES.AddAllergy, {
                item: item
            });
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("got in focus");
            this.getAllergies();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#f5f5f5' }} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: BACKGROUND.primary, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingBottom: '33%', }}>
                    <CustomHeader paddingTop={25} paddingBottom={20} left="Skip" type="icon" leftPress={this.goBack} color={TEXT.primary} iconName="arrowleft" inFrontOfLeft="Allergies" bgColor={BACKGROUND.primary} inFrontOfLeftStyle={styles.headerTitle} width={'80%'} />

                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 10, borderRadius: 20, elevation: 4, backgroundColor: 'white', padding: 20, marginTop: '-30%', height: '85%', justifyContent: 'space-between' }}>
                    <View>
                        <View>
                            <Text style={{ color: BACKGROUND.primary, fontWeight: 'bold', fontSize: 15 }}>Severity Level</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '80%', marginVertical: 10 }}>
                            <View style={{ height: 15, width: 15, borderRadius: 8, backgroundColor: '#C73535', marginTop: 3 }} />
                            <Text>HIGH</Text>
                            <View style={{ height: 15, width: 15, borderRadius: 8, backgroundColor: '#FFCC00', marginTop: 3 }} />
                            <Text>MODERATE</Text>
                            <View style={{ height: 15, width: 15, borderRadius: 8, backgroundColor: 'green', marginTop: 3 }} />
                            <Text>LOW</Text>
                        </View>
                        <View style={{ height: 0.06, width: "100%", backgroundColor: 'gray' }} />
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList style={{ height: '73%' }}
                                data={this.state.allergies}
                                renderItem={({ item }) => (
                                    <TouchableOpacity activeOpacity={1} onPress={() => { this.updateAllergy(item) }} >
                                        <View style={{ flexDirection: 'row', borderRadius: 20, backgroundColor: 'white', elevation: 2, marginTop: 20, marginHorizontal: 1, marginBottom: 5 }}>
                                            <View style={{ height: '99%', width: '4%', backgroundColor: alleryLevelColors[item.serverity], borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                                            <View style={{ width: '40%', paddingHorizontal: 10, justifyContent: 'space-evenly' }}>
                                                <Text style={{ color: BACKGROUND.primary, alignSelf: 'center', fontWeight: 'bold' }}>{item.allergyType}</Text>
                                                <View style={{ height: 0.50, width: "100%", marginTop: 10, backgroundColor: 'gray' }} />
                                                <Text style={{ marginHorizontal: 10, textAlign: 'center' }}>{item.reaction}</Text>
                                            </View>
                                            <View style={{ width: 0.5, height: '80%', backgroundColor: TEXT.time, alignSelf: 'center' }} />
                                            <View style={{ width: '52%', paddingVertical: 20, paddingHorizontal: 10, }}>
                                                <Text>{item.Notes}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                                }
                            />
                        </SafeAreaView>
                    </View>
                    {this.props.route.params.id == JSON.parse(this.props.user.userDetail.userDetails).user._id && <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(SCREEN_NAMES.AddAllergy)}  >
                        <Text style={styles.buttonText}>Add Allergy</Text>
                    </TouchableOpacity>}
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: "60%",
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: BACKGROUND.primary,
        backgroundColor: BACKGROUND.primary,
        marginBottom: 10
    },
    buttonText: {
        // fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        color: TEXT.primary,
        fontSize: 18
    }
})

function mapStateToProps(state, props) {
    return state;
}

const mapDispatchToProps = dispatch => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(MyAllergies);