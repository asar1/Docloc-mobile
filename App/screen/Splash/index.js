/* eslint-disable no-undef */
import React, { Component } from "react";
import { Alert, Text } from "react-native";
import { connect } from "react-redux";
import * as Types from "../../redux/actions/types";
import Route from "../../Network/route";
import SplashStyles from "./SplashStyles";
import {
  USERDETAIL,
  TOKEN,
  BASE_URL,
  MAIN_STACKS,
  ATTENTEDTUTORIAL,
  USERID,
  USERROLE,
} from "../../helper/Constant";
import { TEXT } from "../../helper/Color";
import AsyncStorage from "@react-native-community/async-storage";

const route = new Route(BASE_URL);

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: true,
      loading: false,
      fcmToken: "",
    };
  }

  getAsyncData = async () => {
    // AsyncStorage.clear()
    const tutorialSeen = await AsyncStorage.getItem(ATTENTEDTUTORIAL);

    const userDetail = await AsyncStorage.getItem(USERDETAIL);
    const token = await AsyncStorage.getItem(TOKEN);
    const userId = await AsyncStorage.getItem(USERID);
    const userRole = await AsyncStorage.getItem(USERROLE);

    console.log(userDetail, "=> user detail");
    console.log(token, "=> token");
    console.log(userId, "=> user id");
    console.log(userRole, "=> user role");

    if (tutorialSeen && tutorialSeen === "true") {
      if (
        userDetail != null &&
        token != null &&
        userId != null &&
        userRole != null
      ) {
        this.props.setToken(token);
        this.props.setRole(userRole);
        this.props.setUser(userDetail);

        this.props.navigation.replace(MAIN_STACKS.DrawerStack);
      } else {
        this.props.navigation.replace(MAIN_STACKS.SignInStack);
      }
    } else {
      this.props.navigation.replace(MAIN_STACKS.TutorialStack);
    }

    // if (token === undefined || token === "" || token === null) {
    //   console.log("this is 1");
    //   this.props.navigation.replace(MAIN_STACKS.TutorialStack);
    //   // this.props.navigation.navigate('Drawer')
    // } else if (
    //   userDetail === undefined ||
    //   userDetail === "" ||
    //   userDetail === null
    // ) {
    //   console.log("this is 2");
    //   this.props.setToken(JSON.parse(token));
    //   this.props.navigation.navigate("SignUpDetail");
    // } else {
    //   console.log("this is 3");
    //   if (JSON.parse(userDetail).isProfileCompleted) {
    //     this.props.setToken(JSON.parse(token));
    //     this.props.alterJustUser(JSON.parse(userDetail));
    //     this.props.navigation.navigate("MainScreen");
    //   } else {
    //     this.props.setToken(JSON.parse(token));
    //     this.props.alterJustUser(JSON.parse(userDetail));
    //     this.props.navigation.navigate("SignUpDetail");
    //   }
    // }
  };

  componentDidMount() {
    setTimeout(() => {
      this.getAsyncData();
    }, 3000);
  }

  updateProfile = (token, userData) => {
    this.setState({ isLoading: true });
    const data = new FormData();
    data.append("api_token", token);
    data.append("user_id", userData.id);
    data.append("fcm_token", this.state.fcmToken);
    data.append("fcm_token_type", "android");

    route.post("edit-user-data", data).then((res) => {
      if (res.error) {
        Alert.alert("Error", JSON.stringify(res));
        this.setState({ isLoading: false });
      } else {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("OnBoardingScreens");
      }
    });
  };

  render() {
    return (
      <SplashStyles.WrapperViewVertical>
        <SplashStyles.SplashText>
          <Text
            style={{ fontWeight: "700", fontSize: 40, color: TEXT.primary }}
          >
            {" "}
            DocLoc{" "}
          </Text>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 5, marginLeft: 7 }}></View>
            <View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 5, marginLeft: 7 }}></View>
            <View style={{ backgroundColor: 'white', width: 5, height: 5, borderRadius: 5, marginLeft: 7 }}></View>
          </View> */}
        </SplashStyles.SplashText>
      </SplashStyles.WrapperViewVertical>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
  };
}

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) =>
    dispatch({
      type: Types.SET_TOKEN,
      payload: {
        token,
      },
    }),
  setRole: (role) =>
    dispatch({
      type: Types.SET_ROLE,
      payload: {
        role,
      },
    }),
  setUser: (userDetails) =>
    dispatch({
      type: Types.SET_USER,
      payload: {
        userDetails,
      },
    }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Splash);
