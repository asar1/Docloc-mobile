/* eslint-disable no-undef */
import React, { Component } from "react";
import { Alert, View, Text, StyleSheet, BackHandler, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as Types from "../../redux/actions/types";
import Route from "../../Network/route";
import SignInStyles from "./SignInStyles";
import { WHITE, BACKGROUND, TEXT } from "../../helper/Color";
import { BASE_URL, MAIN_STACKS, SCREEN_NAMES, TOKEN, USERDETAIL, USERID, USERROLE } from "../../helper/Constant";
import SelectRole from "../../component/selectRole/index";

// sha1 key 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25

const route = new Route(BASE_URL);
var user = [];

// Settings.initializeSDK()

GoogleSignin.configure({
  // webClientId: "81510721497-r9t0jglr32346sm0ubr6716if8vsu1nc.apps.googleusercontent.com",      oldone
  webClientId: '798001036468-d6comc1j3993ciavcbc6ucfmodte2phd.apps.googleusercontent.com',
  offlineAccess: true
})

class SignIn extends Component {
  _unsubscribe = null;
  _unsubscribe2 = null;
  constructor(props) {
    super(props);
    this.state = {
      selectedRemember: false,
      email: "",
      password: "",
      isLoading: false,
      userInfo: "",
      selectedRole: 'user',
      backPressed: 0
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      // Repleace with your webClientId generated from Firebase console
      // new client id 1060261610189-heek67bkfs8do7c5i2rbqpimj5kjdmki.apps.googleusercontent.com
      // previous client id AIzaSyAN6N_1cAbvNyNdecQrU1ZdlO-WDeqRfRI
      webClientId: "798001036468-d6comc1j3993ciavcbc6ucfmodte2phd.apps.googleusercontent.com",
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.setState({ backPressed: 0 });

      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    });
    this._unsubscribe2 = this.props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  toggleRole = () => {
    this.setState({ selectedRole: this.state.selectedRole === "user" ? "doctor" : "user" })
  }


  handleBackButton = () => {
    if (this.state.backPressed === 1) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show("Press again to exit app.", ToastAndroid.SHORT);
      this.setState({ backPressed: 1 });
    }

    return true;
  };

  facebookSignIn(role) {
    this.setState({ isLoading: true });
    // if (LoginManager.getInstance() != null) {
    //   console.log('facebook logout')
    //   LoginManager.getInstance().logOut();
    // } else {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          this.setState({ isLoading: false });
          alert("Login was cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            let dataForRequest = {
              accessToken: data.accessToken.toString(),
              userID: data.userID.toString(),
              role: this.state.selectedRole
            };
            route
              .postdata("auth/facebooksignin", dataForRequest)
              .then(async (res) => {
                this.setState({ isLoading: false });
                if (res.status) {
                  this.props.setToken(res.data.token);
                  this.props.setRole(res.data.user.role === 'user' ? 'patient' : 'doctor');
                  this.props.setUser(res.data.user);

                  await AsyncStorage.setItem(TOKEN, res.data.token);
                  await AsyncStorage.setItem(USERDETAIL, JSON.stringify(res.data));
                  await AsyncStorage.setItem(USERID, res.data.user._id);
                  await AsyncStorage.setItem(USERROLE, res.data.user.role === 'user' ? 'patient' : 'doctor');
                  this.props.navigation.navigate(MAIN_STACKS.DrawerStack);
                }
                else {
                  console.log(res.message, 'respon for facebook signin')
                  Alert.alert('Info', res.message);
                }

              })
              .catch((error) => {

                this.setState({ isLoading: false });
                console.log(JSON.stringify(error), "this is catch in error");
              });
          });
        }
      },
      (error) => {
        this.setState({ isLoading: false });
        alert("Login failed with error: " + error);
      }
    );
    // }
  }

  signInGoogle = async () => {
    try {
      this.setState({ isLoading: true });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        let dataForRequest = {
          accessToken: userInfo.idToken.toString(),
          userID: userInfo.user.id.toString(),
          role: this.state.selectedRole
        };
        route
          .postdata("auth/googlesignin", dataForRequest)
          .then(async (res) => {
            this.setState({ isLoading: false });
            if (res.status) {
              this.props.setToken(res.data.token);
              this.props.setRole(res.data.user.role === 'user' ? 'patient' : 'doctor');
              this.props.setUser(res.data.user);


              await AsyncStorage.setItem(TOKEN, res.data.token);
              await AsyncStorage.setItem(USERDETAIL, JSON.stringify(res.data));
              await AsyncStorage.setItem(USERID, res.data.user._id);
              await AsyncStorage.setItem(USERROLE, res.data.user.role === 'user' ? 'patient' : 'doctor');

              this.props.navigation.navigate(MAIN_STACKS.DrawerStack);

            }
            else {
              Alert.alert('Info', res.message);
            }
          })
          .catch((error) => {
            this.setState({ isLoading: false });
            console.log(error, "this is catch in error");
          });
      }

      // alert(JSON.stringify(userInfo));
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error, 'error');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("IN_PROGRESS");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        alert("call4" + JSON.stringify(error));
        // some other error happened
      }
    }
  };

  render() {
    return (
      <SignInStyles.WrapperViewVertical>
        <SignInStyles.WrapperViewVertical2 style={{ justifyContent: "center" }}>
          {/* <SignInStyles.TopAbsoluteView> */}
          <View style={styles.TopAbsoluteView}>
            <Text style={styles.headerText}>DocLoc</Text>
          </View>
          {/* <View style={{ width: '100%', marginTop: 90, justifyContent: 'center', flexDirection: 'row', height: 34, padding: 5 }} >
            <TouchableWithoutFeedback onPress={this.toggleRole} style={{height: 34, width: 109, backgroundColor: 'yellow'}}  >
              <View style={this.state.selectedRole === "user" ? [styles.selectRole, styles.selectedRole, {position: 'absolute', top:0, bottom: 0}] : styles.selectRole}   >
                <Text style={{ alignSelf: 'center' }} >Patient</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.toggleRole} style={{height: 34, width: 109, backgroundColor: 'purple'}} >
              <View style={this.state.selectedRole === "doctor" ? [styles.selectRoleDoctor, styles.selectedRole, {position: 'absolute'}] : styles.selectRoleDoctor} onPress={this.toggleRole}  >
                <Text style={{ alignSelf: 'center' }} >Doctor</Text>
              </View>
            </TouchableWithoutFeedback>
          </View> */}
          {/* </SignInStyles.TopAbsoluteView> */}
          <View style={{ width: '100%', marginTop: 90, justifyContent: 'center', flexDirection: 'row', height: 34, padding: 5 }} >
            <SelectRole onPressRole={this.toggleRole} currentRole={this.state.selectedRole} />
          </View>
          <SignInStyles.PhoneNumberSignButton
            onPress={() => this.props.navigation.navigate(SCREEN_NAMES.PhoneAuth, { params: { role: this.state.selectedRole } })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <SignInStyles.AbsoluteIconView> */}
              <Icon1 name="mobile" size={20} color={'#7a3fe1'} style={{ marginRight: 20 }} />
              {/* </SignInStyles.AbsoluteIconView> */}
              <Text>Mobile Number</Text>
            </View>
          </SignInStyles.PhoneNumberSignButton>
          <SignInStyles.PhoneNumberSignButton
            style={{ marginTop: 25 }}
            onPress={() => this.facebookSignIn()}
          >
            {/* <SignInStyles.AbsoluteIconView> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon2 name="sc-facebook" size={30} color={BACKGROUND.primary} />
              {/* </SignInStyles.AbsoluteIconView> */}
              <Text> Facebook </Text>
            </View>
          </SignInStyles.PhoneNumberSignButton>

          <SignInStyles.PhoneNumberSignButton
            style={{ marginTop: 25 }}
            onPress={() => this.signInGoogle()}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* <SignInStyles.AbsoluteIconView> */}
              <Icon3 name={"google"} size={20} color={BACKGROUND.danger} style={{ marginRight: 20 }} />
              {/* </SignInStyles.AbsoluteIconView> */}
              <Text style={{ fontSize: 15 }}>Google</Text>
            </View>

          </SignInStyles.PhoneNumberSignButton>
          <Text style={{ alignSelf: 'center', fontSize: 12, color: TEXT.subHeading, marginTop: 30 }}>
            By continuing, you agree to Terms & Conditions
          </Text>
        </SignInStyles.WrapperViewVertical2>

        {this.state.isLoading && (
          <SignInStyles.AbsoluteLoadingView>
            <SignInStyles.ActivityIndicatorLoading
              size="large"
              color={WHITE.dark}
            />
          </SignInStyles.AbsoluteLoadingView>
        )}


        <View style={styles.bottomView}>

        </View>
      </SignInStyles.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({

  TopAbsoluteView: {
    height: 472,
    width: 492,
    borderBottomLeftRadius: 230,
    borderBottomRightRadius: 250,
    backgroundColor: BACKGROUND.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 125,
    paddingLeft: 20,
    position: 'absolute',
    top: -220,
    left: -60,
    marginRight: 40
  },
  bottomView: {
    width: 200,
    height: 200,
    backgroundColor: BACKGROUND.primary,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: -100,
    right: -80,
    borderRadius: 125,

  },
  headerText: {
    fontSize: 35,
    color: TEXT.primary,
    fontWeight: 'bold'
  },
  iconMargin: {
    marginRight: 40
  },
  selectRole: { height: 34, width: 109, borderRadius: 17, backgroundColor: 'red', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.29, shadowRadius: 4, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' },
  selectRoleDoctor: { height: 34, width: 139, borderRadius: 17, backgroundColor: 'green', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.29, shadowRadius: 4, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' },
  selectedRole: { zIndex: 1000 }
})
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }
// const mapStateToProps = state = state;
const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({
    type: Types.SET_TOKEN, payload: {
      token
    }
  }),
  setRole: role => dispatch({
    type: Types.SET_ROLE, payload: {
      role
    }
  }),
  setUser: userDetails => dispatch({
    type: Types.SET_USER, payload: {
      userDetails
    }
  })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(SignIn);
