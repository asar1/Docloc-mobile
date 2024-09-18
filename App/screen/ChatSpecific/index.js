/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    FlatList,
    Alert,
    StyleSheet,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import * as Actions from '../../redux/actions'; //Import your actions
import ChatHeader from '../../component/ChatHeader';
import { WHITE, BLACK, GREEN, BLUE, BACKGROUND, TEXT } from '../../helper/Color';
import { BASE_HOST_URL, SCREEN, USERDETAIL } from '../../helper/Constant';
import CustomHeader from '../../component/CustomHeader';
import * as ImagePicker from "react-native-image-picker";
import MyInput from '../../component/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import io from 'socket.io-client';
import { USERID } from '../../helper/Constant';
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from 'react';
import mime from "mime";
import Loader from '../../component/Loader';
import AsyncStorage from "@react-native-community/async-storage";

const socket = io(BASE_HOST_URL);
socket.on('welcome', () => console.log("connected with client"));

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
]
class ChatSpecific extends Component {
    constructor() {
        super();
        this.state = {
            sender: '',
            guest: '',
            // messageList: [
            //   {
            //     message: 'Hello',
            //     from: 'other',
            //     time: '04:20',
            //     date: '04/10/19',
            //   },
            //   {
            //     message: 'Hello',
            //     from: 'me',
            //     time: '04:21',
            //     date: '04/10/19',
            //   },
            //   {
            //     message: 'How are you?',
            //     from: 'other',
            //     time: '04:22',
            //     date: '04/10/19',
            //   },
            //   {
            //     message: 'I am fine',
            //     from: 'me',
            //     time: '04:22',
            //     date: '04/10/19',
            //   },
            // ],
            messageList: [],
            orderDataProduct: [],
            orderDataDeal: [],
            imageUri: '',
            messageText: '',
            started: false,
            audioUrl: '',
            chatWithName: '',
            chatWithImg: '',
            loading: false
        };
    }

    componentWillUnmount() {
        socket.emit('disconnectFromServer');
        socket.off();
    }

    handleSend = () => {

        if (this.state.messageText) {
            const messageBody = {
                sender: this.state.sender,
                receiver: this.state.guest,
                message: {
                    text: this.state.messageText,
                    date: new Date(),
                    img: ''
                },
                user: `Bearer ${this.props.user.userToken}`,
                from: this.props.user.userRole,
                socketId: socket.id
            }

            let appendedMessage = {
                sendBy: this.state.sender,
                recievedBy: this.state.guest,
                msg: this.state.messageText,
                img: '',
                date: this.convertDate(new Date()),
                sent: false
            }

            socket.emit('sendMessage', messageBody);
            this.setState({ messageText: '', messageList: [...this.state.messageList, appendedMessage] });
        }

    };

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

                let appendedMessage = {
                    sendBy: this.state.sender,
                    recievedBy: this.state.guest,
                    msg: '',
                    img: response.uri,
                    date: this.convertDate(new Date()),
                    sent: false
                }

                this.setState({ messageList: [...this.state.messageList, appendedMessage] });

                try {
                    fetch(`${BASE_HOST_URL}/api/open/upload-chat-image`, {
                        headers: {
                            Authorization: `Bearer ${this.props.user.userToken}`,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(photo)
                    })
                        .then(response => {
                            response.json().then(res => {
                                if (res.data.length > 0) {
                                    const messageBody = {
                                        sender: this.state.sender,
                                        receiver: this.state.guest,
                                        message: {
                                            text: '',
                                            date: new Date(),
                                            img: res.data[0]
                                        },
                                        user: `Bearer ${this.props.user.userToken}`,
                                        from: this.props.user.userRole,
                                        socketId: socket.id
                                    }
                                    socket.emit('sendMessage', messageBody);
                                    this.setState({ messageText: '' });
                                }

                            })

                        })
                        .catch(e => {
                        });
                } catch (error) {
                }


            }
        });

    };

    goBack = () => {
        this.props.navigation.goBack();
    }

    loadMessages = () => {
        let fetchParams = {
            sender: this.state.sender,
            receiver: this.state.guest,
            from: this.props.user.userRole
        };

        socket.emit('fetchMessages', fetchParams);
        socket.on('fetchMessagesResponse', (recievedMessages) => {
            let msgs = [];
            recievedMessages.forEach((item) => {
                msgs.push({
                    sendBy: item.from,
                    recievedBy: item.receiver,
                    msg: item.text,
                    img: item.img,
                    date: this.convertDate(item.date),
                    sent: item.sent
                });
            });
            this.setState({ messageList: msgs });
        })
        this.setState({ loading: false })
    }

    setSenderAndReceiver = async () => {
        let currentUser = await AsyncStorage.getItem(USERID);
        this.setState({ sender: currentUser, guest: this.props.route.params.userId })
    }

    showFullImage = (img) => {
        this.props.navigation.navigate('full-image', {
            img
        })
    }

    async componentDidMount() {

        this.setState({ loading: true });

        await this.setSenderAndReceiver();

        this.loadMessages();

        socket.emit('storeSocketId', {
            sender: this.state.sender,
            receiver: this.state.guest,
            from: this.props.user.userRole,
            socket: socket.id
        });
        // this.setState({ loading: false });
    }

    convertDate = (dateInString) => {
        let date = new Date(dateInString);

        let datein = date.getDate();
        let month = date.getMonth();
        let time = date.getHours() + ":" + date.getMinutes();

        return `${months[month]} ${datein}, ${time}`;

    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    marginBottom:
                        Platform.OS === 'ios' &&
                            (SCREEN.height === 812 ||
                                SCREEN.width === 812 ||
                                SCREEN.height === 896 ||
                                SCREEN.width === 896)
                            ? 30
                            : 5,
                    backgroundColor: TEXT.primary,
                }}>
                {/* <ChatHeader
          leftType={'text'}
          leftText={this.state.chatWithName}
          leftPress={() => this.props.navigation.pop()}
          rightType={'text'}
          rightImage={this.state.chatWithImg}
        /> */}

                <View style={styles.header} >
                    <CustomHeader
                        left="Skip"
                        type="icon"
                        leftPress={this.goBack}
                        iconSize={30}
                        color={TEXT.primary}
                        iconName="close"
                        inFrontOfLeft={this.props.route.params.name ? this.props.route.params.name : "doctor name"}
                        inFrontOfLeftStyle={styles.headerText}
                        paddingTop={25}
                    />
                </View>
                {this.state.messageList.length === 0 && <View style={{ height: '79%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text>No conversations yet.  </Text>
                </View>}
                <SafeAreaView
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View
                        style={{
                            height: 44,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: 0,
                        }}>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', backgroundColor: TEXT.primary, height: 50, marginBottom: 10, borderWidth: 1,
                                borderRadius: 15, shadowOffset: { width: 0.5, height: 1 },
                                shadowColor: BLACK.dark,
                                shadowOpacity: 0.35,
                                elevation: 1,
                                borderColor: '#ECECEC',
                                paddingHorizontal: 20
                            }} >

                                <TouchableOpacity
                                    onPress={this.selectFile}
                                >
                                    <Icon name={'attachment'} size={18} color={BACKGROUND.primary} />
                                </TouchableOpacity>
                                {/* <TextInput
                  style={{
                    height: 49,
                    width: SCREEN.width - 150,
                    borderColor: WHITE.borderLight,
                    alignSelf: 'center',
                    
                  }}
                  value={this.state.messageText}
                  key="input"
                  onChangeText={(messageText) => this.setState({ messageText })}
                /> */}

                                <MyInput
                                    messageText={this.state.messageText}
                                    onChange={(messageText) => this.setState({ messageText })}
                                />

                                <TouchableOpacity
                                    onPress={this.handleSend}
                                >
                                    <Icon2 name={'send'} size={18} color={BACKGROUND.primary} />
                                </TouchableOpacity>
                                {/* <View style={{  backgroundColor: 'red', position: 'absolute', zIndex: 100, top: 0, left: 100 }}>
                  <TouchableOpacity
                    onPress={this.handleSend}
                  >
                    <Icon2 name={'send'} size={25} color={BACKGROUND.primary} />
                  </TouchableOpacity>
                </View> */}

                            </View>


                        </View>

                    </View>


                    <View style={{ marginBottom: 60 }}>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            ref={ref => this.flatList = ref}
                            onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                            data={this.state.messageList}
                            renderItem={(item) => (
                                <View
                                    style={{
                                        minHeight: 40,
                                        width: SCREEN.width - 10,
                                        alignSelf: 'center',
                                        padding: 5
                                    }}>
                                    <View>

                                        {item.item.msg ? <View
                                            style={[{
                                                width: '80%',
                                                justifyContent: 'center',
                                            }, this.state.sender === item.item.sendBy ? styles.currentUserImages : styles.guestUserImages]}>
                                            <Text
                                                style={[{
                                                    padding: 10,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    fontFamily: 'Poppins',
                                                    fontSize: 14,
                                                    fontWeight: '700',
                                                    paddingBottom: 0
                                                }, this.state.sender === item.item.sendBy ? [styles.currentUserBorderStyle, styles.currentUserMessagecolor] : [styles.guestUserBorderStyle, styles.guestUserMessageColor]]}>
                                                {item.item.msg}
                                                {"\n"}
                                                <View style={{ paddingTop: 2, paddingBottom: 3 }}>
                                                    <Text style={[{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10 }, this.state.sender === item.item.sendBy ? styles.currentUserMessagecolor : styles.guestUserMessageColor]} >
                                                        {item.item.sent ? item.item.date : "sending..."}
                                                    </Text>
                                                </View>

                                            </Text>



                                        </View> : null}

                                        {item.item.img ?

                                            <TouchableOpacity
                                                onPress={() => this.showFullImage(item.item.img)}
                                            >

                                                <View style={[{
                                                    width: '80%',
                                                    justifyContent: 'center'
                                                }, this.state.sender === item.item.sendBy ? styles.currentUserImages : styles.guestUserImages]}>
                                                    <Image
                                                        source={{ uri: item.item.img }}
                                                        resizeMode="cover"
                                                        style={[{
                                                            height: 130, width: 130, padding: 10,
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }, this.state.sender === item.item.sendBy ? styles.currentUserBorderStyle : styles.guestUserBorderStyle]}
                                                    />

                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#ffffff00", "#999999"]} style={[{ backgroundColor: 'tansparent', width: 130, alignItems: 'flex-end', position: 'absolute', bottom: 0, height: 17 }, this.state.sender === item.item.sendBy ? styles.currentUserBorderStyle : styles.guestUserBorderStyle]} >
                                                        <Text style={{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10, paddingRight: 10, color: TEXT.primary }} >
                                                            {item.item.sent ? item.item.date : "uploading..."}
                                                        </Text>
                                                    </LinearGradient>


                                                </View>
                                            </TouchableOpacity>

                                            : null}

                                    </View>

                                </View>
                            )}
                        />
                    </View>
                </SafeAreaView>

                {this.state.loading && <Loader loadingText="Loading..." />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: BACKGROUND.primary,
        width: '100%',
        height: 90,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
    },
    headerText: {
        fontFamily: 'Poppins-Bold',
        color: TEXT.primary,
        fontSize: 17,
        fontWeight: '700'
    },
    currentUserImages: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
    },
    guestUserImages: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    currentUserBorderStyle: {
        borderBottomLeftRadius: 10
    },
    guestUserBorderStyle: {
        borderBottomRightRadius: 10
    },
    currentUserMessagecolor: {
        backgroundColor: BACKGROUND.primary,
        color: TEXT.primary,
    },
    guestUserMessageColor: {
        backgroundColor: '#E6E6E6',
        color: '#4C5264',
    }
})

function mapStateToProps(state, props) {
    return state;
}

const mapDispatchToProps = dispatch => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(ChatSpecific);
