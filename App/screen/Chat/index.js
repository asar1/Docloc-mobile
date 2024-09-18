import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  StyleSheet
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import * as Actions from "../../redux/actions"; //Import your actions
import { BLACK, TEXT, BACKGROUND } from '../../helper/Color';
import { SCREEN, USERDETAIL } from '../../helper/Constant';
import CustomHeader from '../../component/CustomHeader';
import MyInput from '../../component/TextInput';
import Loader from '../../component/Loader/index';
import * as ImagePicker from "react-native-image-picker";
import LinearGradient from 'react-native-linear-gradient';


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

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      chatMemberList: [
        {
          name: 'Sadaf', message: "You didn't make it last time", image: 'https://bacp-web-live-endpoint.azureedge.net/cache/c/0/5/1/6/9/c05169ac9de9665c866f2a667552e5ed5d4f4a8e.jpg'
        },
        {
          name: 'Noor', message: "You were late.", image: 'https://about.fb.com/wp-content/uploads/2019/11/CompanyInfo_OurCulture_Alberto_Image-1.jpg?fit=890%2C668'
        },
        {
          name: 'Mehmood', message: "What is your problem brother.", image: 'https://tvguide1.cbsistatic.com/i/2018/02/10/3a534e4d-ffa5-402d-b68d-cb0c7368e6af/1d544b6e110f4394a28bf5db8434a840/180209-personofinterest.jpg'
        }
      ],
      sender: 'xtcjMFGlNAVhccZhEWt2xF6rwpG2',
      guest: 'tZJoVFSIg6h4ZjTZ214p9m0YvIr1',
      messageList: [],
      loading: false
    };
  }

  getCurrentUser = async () => {
    let currentUser = await AsyncStorage.getItem(USERDETAIL);
    let currentUserInJson = JSON.parse(currentUser);
    // console.log(currentUserInJson.user.fireBaseId, "fire base Id of Sender")
    // this.setState({ sender: currentUserInJson.user.fireBaseId });
  }
  goBack = () => {
    this.props.navigation.goBack();
  }

  convertDate = (dateInString) => {
    let date = new Date(dateInString);
    console.log(date, "this is date")

    let datein = date.getDate();
    let month = date.getMonth();
    let time = date.getHours() + ":" + date.getMinutes();

    console.log(`${months[month]} ${datein}, ${time}`, "here you go")

    return `${months[month]} ${datein}, ${time}`;

  }

  componentDidMount() {
    // this.getCurrentUser()
    // try {
    //   firebase
    //     .database()
    //     .ref("messeges")
    //     .child(this.state.guest)
    //     .child(this.state.sender)
    //     .on("value", (dataSnapshot) => {
    //       let msgs = [];
    //       dataSnapshot.forEach((child) => {
    //         msgs.push({
    //           sendBy: child.val().messege.sender,
    //           recievedBy: child.val().messege.reciever,
    //           msg: child.val().messege.msg,
    //           img: child.val().messege.img,
    //           date: this.convertDate(child.val().messege.dateEntered)
    //         });
    //         console.log(child.val().messege.img ? 'image found' : 'image not found')
    //       });
    //       this.setState({ messageList: msgs.reverse() });
    //       console.log('succeed.')
    //     });
    // } catch (error) {
    //   alert(error);
    //   console.log('failed.', error)
    // }
  }

  handleSend = () => {

    if (this.state.messageText) {

      // senderMsg(this.state.messageText, this.state.guest, this.state.sender, "", new Date())
      //   .then(() => { })
      //   .catch((err) => alert(err));
      this.setState({ messageText: "" })

      // * guest user

      // recieverMsg(this.state.messageText, this.state.guest, this.state.sender, "", new Date())
      //   .then(() => { })
      //   .catch((err) => alert(err));
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
        console.log("User cancel image picker");
      } else if (response.error) {
        console.log(" image picker error", response.error);
      } else {
        // Base 64

        console.log("Response is =", Object.keys(response))
        let source = "data:image/jpeg;base64," + response.base64;
        console.log('going to send image')
        // senderMsg(this.state.messageText, this.state.guest, this.state.sender, source, new Date())
        //   .then(() => {
        //     console.log('image sent to sender')
        //   })
        //   .catch((err) => alert(err));

        // * guest user

        // recieverMsg(this.state.messageText, this.state.guest, this.state.sender, source, new Date())
        //   .then(() => {
        //     console.log('image sent to guest')
        //   })
        //   .catch((err) => alert(err));
      }
    });

  };

  showFullImage = (img) => {
    this.props.navigation.navigate('full-image', {
      img
    })
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
            paddingTop={25}
            inFrontOfLeft={"Reply to a patient"}
            inFrontOfLeftStyle={styles.headerText}
          />
        </View>
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


          <View style={{ marginBottom: 60, backgroundColor: TEXT.primary }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.messageList.reverse()}
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
                      }, this.state.guest === item.item.sendBy ? styles.currentUserImages : styles.guestUserImages]}>
                      <Text
                        style={[{
                          backgroundColor: BACKGROUND.primary,
                          padding: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          fontFamily: 'Poppins',
                          color: TEXT.primary,
                          fontSize: 12,
                          fontWeight: '700'
                        }, this.state.guest === item.item.sendBy ? styles.currentUserBorderStyle : styles.guestUserBorderStyle]}>
                        {item.item.msg}
                        {"\n"}
                        <View style={{ paddingTop: 2, paddingBottom: 3 }}>
                          <Text style={{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10, color: TEXT.primary }} >
                            {item.item.date}
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
                        }, this.state.guest === item.item.sendBy ? styles.currentUserImages : styles.guestUserImages]}>
                          <Image
                            source={{ uri: item.item.img }}
                            resizeMode="cover"
                            style={[{
                              height: 130, width: 130, padding: 10,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }, this.state.guest === item.item.sendBy ? styles.currentUserBorderStyle : styles.guestUserBorderStyle]}
                          />
                          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#ffffff00", "#999999"]} style={[{ backgroundColor: 'tansparent', width: 130, alignItems: 'flex-end', position: 'absolute', bottom: 0, height: 17 }, this.state.guest === item.item.sendBy ? styles.currentUserBorderStyle : styles.guestUserBorderStyle]} >
                            <Text style={{ fontWeight: 'normal', fontFamily: 'Poppins', fontSize: 10, paddingRight: 10, color: TEXT.primary }} >
                              {item.item.date}
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
        {this.state.loading && <Loader />}
      </View>

    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
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
})

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Chat);

export default Chat;