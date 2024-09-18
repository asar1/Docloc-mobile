import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { BACKGROUND, TEXT } from '../../helper/Color';
import * as ImagePicker from "react-native-image-picker";
import CustomHeader from '../../component/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_HOST_URL, BASE_URL, TEM_TOKEN } from '../../helper/Constant';
import Route from "../../Network/route";
import { connect } from 'react-redux';

const re = /(?:\.([^.]+))?$/;
const route = new Route(BASE_URL);

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            title: '',
            content: '',
            error: ''
        }
    }


    selectFile = () => {
        const option = {
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchImageLibrary(option, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                // Base 64
                var photo = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                    base64: response.base64
                };

                try {
                    fetch(`${BASE_HOST_URL}/api/open/upload-chat-image`, {
                        headers: {
                            Authorization: `Bearer nothing`,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(photo)
                    })
                        .then(response => {
                            response.json().then(res => {
                                console.log(res, 'res')
                                if (res.data.length > 0) {
                                    let previousNotUploadedImages = this.state.images;
                                    let indexShouldBe = previousNotUploadedImages.findIndex(x => {
                                        return !x.uri.includes('https://storage.googleapis.com/')
                                    });
                                    if (indexShouldBe > -1) {
                                        previousNotUploadedImages.splice(indexShouldBe, 1);
                                    }
                                    this.setState({ images: [...previousNotUploadedImages, { uri: res.data[0] }] })
                                }
                            });
                        })
                        .catch(e => {
                            console.log(e, 'err');
                        });
                } catch (error) {
                    console.log(error, 'err');

                }

                this.setState({ images: [...this.state.images, photo] });
            }
        });

    };

    onCreatePost = () => {
        this.setState({ error: '' })
        const images = this.state.images.map(x => {
            if (x.uri.includes('https://storage.googleapis.com/')) {
                return x.uri;
            }
        })
        const reqBody = {
            title: this.state.title,
            content: this.state.content,
            image: images
        }

        if (reqBody.title && reqBody.content) {
            route.postAuthenticated(`forum/`, reqBody, this.props.user.userToken)
                .then(res => {

                    if (res.status) {
                        console.log(res, 'res found')
                        this.props.navigation.goBack()
                    }
                    else {
                        this.setState({ error: res.message })
                    }
                })
                .catch(err => {
                    this.setState({ error: err.toString() })
                });
        }
        else {
            this.setState({ error: 'Please fill in all of the fields.' })
        }

        console.log(reqBody, 'req body');
    }

    render() {
        return (
            <View style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
                <View style={{ width: '100%', height: 90, backgroundColor: BACKGROUND.primary, justifyContent: 'center', borderBottomStartRadius: 25, borderBottomEndRadius: 25 }}>
                    <CustomHeader
                        paddingTop={25}
                        left="Skip"
                        type="icon"
                        leftPress={() => this.props.navigation.goBack()}
                        color={TEXT.primary}
                        iconName="arrowleft"
                        inFrontOfLeft="Create post"
                        bgColor={BACKGROUND.primary}
                        inFrontOfLeftStyle={styles.headerTitle}
                    />
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{ color: BACKGROUND.primary, fontWeight: 'bold', fontSize: 16 }}>Title</Text>
                        <TextInput onChangeText={(e) => {
                            this.setState({ title: e })
                        }} style={{ backgroundColor: 'white', color: 'gray', borderRadius: 15, marginTop: 10, height: 50, paddingHorizontal: 20, elevation: 3 }} maxLength={120} placeholder='Can be upto 120 characters' />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignContent: 'center' }}>
                            <Text style={{ color: BACKGROUND.primary, fontWeight: 'bold', fontSize: 16, justifyContent: 'center', padding: 8, paddingLeft: 0 }}>Content</Text>
                            <TouchableOpacity onPress={this.selectFile} style={{ width: 32, height: 32, borderRadius: 16, elevation: 3, justifyContent: 'center', padding: 8, backgroundColor: 'white' }}>
                                <Entypo style={styles.attachmenticon} name={'attachment'} color={BACKGROUND.primary} size={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.postCard}>
                            <TextInput onChangeText={(e) => {
                                this.setState({ content: e })
                            }} multiline={true} numberOfLines={3} style={{ lineHeight: 22, color: 'gray', textAlignVertical: 'top' }} placeholder='Add details here...'></TextInput>
                        </View>
                    </View>
                </View>
                <Text style={[{ textAlign: 'center', color: 'black' }, this.state.error && { color: 'black' }]} >{this.state.error}</Text>

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} >
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, justifyContent: 'space-between' }} >
                            {this.state.images.map((x, index) => {
                                return (

                                    <View style={[{ marginVertical: 5, width: '45%' }]} >
                                        <View style={{ flexDirection: 'row' }} >
                                            <Image style={{ height: 100, width: '100%', borderRadius: 15 }} source={{ uri: x.uri }} />
                                            <View style={{ backgroundColor: 'white', elevation: 4, padding: 5, borderRadius: 50, justifyContent: 'center', height: 20, width: 20, marginLeft: -25, marginTop: 5 }} >
                                                <AntDesign
                                                    name={'close'}
                                                    size={10}
                                                    color={BACKGROUND.primary}
                                                    onPress={() => {
                                                        let previousImages = this.state.images;
                                                        previousImages.splice(index, 1);
                                                        this.setState({ images: previousImages });
                                                    }}
                                                />
                                            </View>

                                        </View>

                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#ffffff00", "#999999"]} style={[{ backgroundColor: 'tansparent', width: '100%', alignItems: 'center', borderRadius: 80, position: 'absolute', bottom: 0, height: 17, }]} >
                                            <Text style={{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10, paddingRight: 10, color: TEXT.primary }} >
                                                {("attacchments" + re.exec(x.uri)).split(',')[0]}
                                            </Text>
                                        </LinearGradient>
                                    </View>

                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: '6%', alignSelf: 'center' }}>
                    <View style={{ alignSelf: 'center', paddingTop: '1%' }} >
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            console.log("Pressed")
                            this.onCreatePost();
                        }} style={{ width: 186, height: 50, borderRadius: 50, justifyContent: 'center', borderColor: BACKGROUND.primary, borderWidth: 1, backgroundColor: BACKGROUND.primary }}>
                            <Text style={{ color: BACKGROUND.primary, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 20,
        width: "100%",
        alignSelf: 'center'
    },
    postCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 150,
        elevation: 1,
        // minHeight:100,
        padding: 10
    },
    cardBottom: {
        color: 'blue',
        fontSize: 20,
        paddingTop: 175,
        textAlign: 'center'
    },
    bottomButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6e78f7',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 17,
        fontWeight: '700',
        color: TEXT.primary
    },
});

function mapStateToProps(state, props) {
    return state;
}

const mapDispatchToProps = dispatch => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(CreatePost);