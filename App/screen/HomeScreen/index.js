/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  LogBox
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Route from "../../Network/route";
import HomeScreenStyles from "./HomeScreenStyles";
import { BASE_URL, MAIN_STACKS, SCREEN_NAMES } from "../../helper/Constant";
import {
  BLACK,
  BACKGROUND,
  TEXT,
} from "../../helper/Color";
import Loader from "../../component/Loader";
import { USERDETAIL } from "../../helper/Constant";
import CustomHeader from "../../component/CustomHeader/index";
import { DrawerActions } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";

const route = new Route(BASE_URL);
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

class HomeScreen extends Component {
  _unsubscribe = null;
  _unsubscribe2 = null;
  constructor(props) {
    super(props);
    this.state = {
      completed: true,
      loading: false,
      fcmToken: "",
      search: "",
      categories: [],
      doctorData: [],
      user: {},
      resourcePath: {},
      backPressed: 0
    };
  }

  // selectFile = () => {
  //   ImagePicker.launchImageLibrary(
  //     {
  //       mediaType: "photo",
  //       includeBase64: false,
  //       maxHeight: 200,
  //       maxWidth: 200,
  //     },
  //     (res) => {
  //       if (res.didCancel) {
  //         console.log("User cancelled image picker");
  //       } else if (res.error) {
  //         console.log("ImagePicker Error: ", res.error);
  //       } else if (res.customButton) {
  //         console.log("User tapped custom button: ", res.customButton);
  //         alert(res.customButton);
  //       } else {
  //         let source = res;
  //         this.setState({
  //           resourcePath: source,
  //         });
  //       }
  //     }
  //   );
  // };

  async componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // this.setState({ loading: true });
    this.getAllSpecialties();
    this.getAllDoctors();
    let currentUser = await AsyncStorage.getItem(USERDETAIL);
    let currentUserInJson = JSON.parse(currentUser);
    this.setState({ loading: false, user: currentUserInJson.user });

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
      return () => currentUser
    });
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

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  onProfileimageClick = () => {
    this.props.navigation.navigate(MAIN_STACKS.AccountStack);
  };

  getAllSpecialties() {
    route
      .getAuthenticated("open/speciality", this.props.userToken)
      .then((res) => {
        if (res.status === 0) {
          Alert.alert("Error", JSON.stringify(res.message));
        } else {
          this.setState({ categories: res.data });
        }
      })
      .catch((error) => alert(JSON.stringify(error)));
  }

  getAllDoctors() {
    route
      .getAuthenticated("open/role/doctor", this.props.userToken)
      .then((res) => {
        if (res.status === 0) {
          Alert.alert("Error", JSON.stringify(res.message));
        } else {
          this.setState({ doctorData: res.data });
        }
      });
  }

  async getDoctorsBySpeciality(id) {
    const res = await route
      .getAuthenticated("open/search-by-speciality/" + id);
    if (res.status === 0) {
      Alert.alert("Error", JSON.stringify(res.message));
    } else {
      return res.data;
    }
  }

  onPressMenu = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  render() {
    return (
      <HomeScreenStyles.WrapperViewVertical>
        <CustomHeader
          left="Skip"
          leftPress={this.onPressMenu}
          type="icon"
          color={TEXT.primary}
          iconName="menuunfold"
          rightType="img"
          rightImage={this?.state?.user?.profileImg}
          bgColor={BACKGROUND.primary}
          rightImageClick={this.onProfileimageClick}
          paddingTop={25}
        />
        <HomeScreenStyles.TopView>
          <HomeScreenStyles.HeaderText
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: TEXT.primary,
              marginLeft: 10,
              lineHeight: 43,
            }}
          >
            Hey {this?.state?.user?.firstName}
          </HomeScreenStyles.HeaderText>
          <HomeScreenStyles.HeaderText
            style={{
              // marginTop: 5,
              color: TEXT.primary,
              fontSize: 20,
              marginLeft: 10,
              fontWeight: "bold",
              lineHeight: 43,
            }}
          >
            Find your{" "}
            <HomeScreenStyles.HeaderText
              style={{ fontWeight: "bold", fontSize: 25, color: TEXT.primary }}
            >
              {this?.state?.user?.role === "user" ? "Doctor" : "Appointments"}
            </HomeScreenStyles.HeaderText>
          </HomeScreenStyles.HeaderText>
        </HomeScreenStyles.TopView>
        <HomeScreenStyles.BottomView>
          <HomeScreenStyles.ScrollView bounces={false}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(SCREEN_NAMES.FilterResult, {
                  doctors: this.state.doctorData,
                });
              }}
              activeOpacity={1}
            >
              <HomeScreenStyles.TextInputView
              // onStartShouldSetResponder={() => {
              //   this.props.navigation.navigate(SCREEN_NAMES.FilterResult, {
              //     doctors: this.state.doctorData,
              //   })
              // this.setState({ loading: false })
              // }}
              // elevation={0}
              >
                <HomeScreenStyles.IconView>
                  <Icon name="search" size={20} color={"#C9CACC"} />
                </HomeScreenStyles.IconView>
                <Text style={{ color: "#C9CACC", paddingHorizontal: 5 }}>
                  Search your symptoms...
                </Text>
              </HomeScreenStyles.TextInputView>
            </TouchableOpacity>

            <HomeScreenStyles.HeaderText
              style={{
                marginTop: 12,
                paddingLeft: 23,
                fontSize: 16,
                color: "#707070",
              }}
            >
              Find a Specialist
            </HomeScreenStyles.HeaderText>

            <HomeScreenStyles.CategoriesFlatList
              data={this.state.categories}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={(item, index) => (
                <HomeScreenStyles.CategoryWrapper>
                  <HomeScreenStyles.CategoryItemWrapper
                    onPress={async () => {
                      // this.selectFile()
                      let doctorsWithSpciality =
                        await this.getDoctorsBySpeciality(item.item._id);

                      this.props.navigation.navigate(
                        SCREEN_NAMES.FilterResult,
                        { doctors: doctorsWithSpciality }
                      );
                    }}
                    style={{
                      backgroundColor: "white",
                      elevation: 2,
                      marginTop: 15,
                    }}
                  >
                    <HomeScreenStyles.CategoryItemInner>
                      <Image
                        style={{ width: 40, height: 40, marginTop: 14 }}
                        source={{
                          uri: item?.item?.imageUrl != '' ? item?.item?.imageUrl : undefined,
                        }}
                      />
                    </HomeScreenStyles.CategoryItemInner>
                    <HomeScreenStyles.CategoryItemInner
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Text
                        style={{
                          color: TEXT.black,
                          marginTop: 20,
                          marginBottom: 10,
                          fontFamily: "Poppins-Bold",
                          textAlign: "center",
                          width: 100,
                          fontSize: 12,
                          fontWeight: "700",
                        }}
                        numberOfLines={2}
                      >
                        {item.item.speciality}
                      </Text>
                    </HomeScreenStyles.CategoryItemInner>
                  </HomeScreenStyles.CategoryItemWrapper>
                </HomeScreenStyles.CategoryWrapper>
              )}
            />

            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingHorizontal: 13,
                    fontSize: 16,
                    color: "#707070",
                    fontWeight: "700",
                    fontFamily: "Poppins-Bold",
                  }}
                >
                  Top Doctors
                </Text>
              </View>

              <HomeScreenStyles.DoctorsFlatList
                data={this.state.doctorData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => (
                  <HomeScreenStyles.DoctorWrapper>
                    <HomeScreenStyles.DoctorWrapperInner
                      onPress={() => {
                        this.props.navigation.navigate(
                          SCREEN_NAMES.DoctorDetail,
                          { doctorId: item.item._id }
                        );
                      }}
                    >
                      <HomeScreenStyles.ImageView>
                        <HomeScreenStyles.ImageInner
                          source={item?.item?.profileImg != ''
                            ? { uri: item?.item?.profileImg }
                            : require('../../assets/default.jpg')}
                        />
                      </HomeScreenStyles.ImageView>

                      <View
                        style={{
                          marginLeft: 15,
                          justifyContent: "center",
                          height: 80,
                        }}
                      >
                        <HomeScreenStyles.CellText>
                          Dr. {item.item.firstName}
                        </HomeScreenStyles.CellText>
                        <HomeScreenStyles.CellText
                          style={{
                            color: BLACK.textColor,
                            fontSize: 14,
                            lineHeight: 20,
                          }}
                        >
                          {item.item?.specialities.length > 0
                            ? item.item.specialities[0].speciality
                            : "Dental surgeon"}
                        </HomeScreenStyles.CellText>
                        <HomeScreenStyles.ViewRatting>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Icon2
                              name={"star"}
                              color={BACKGROUND.primary}
                              size={20}
                            />
                            <HomeScreenStyles.HeaderText
                              style={{
                                color: BLACK.textColor,
                                fontSize: 12,
                              }}
                            >
                              {item?.item?.rating}
                            </HomeScreenStyles.HeaderText>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Icon3
                              name={"time-sharp"}
                              color={BACKGROUND.primary}
                              size={17}
                            />
                            <HomeScreenStyles.HeaderText
                              style={{
                                color: BLACK.textColor,
                                fontSize: 12,
                              }}
                            >
                              {item?.item?.openingHours}
                            </HomeScreenStyles.HeaderText>
                          </View>
                        </HomeScreenStyles.ViewRatting>
                      </View>
                    </HomeScreenStyles.DoctorWrapperInner>
                  </HomeScreenStyles.DoctorWrapper>
                )}
              />

            </View>
          </HomeScreenStyles.ScrollView>
        </HomeScreenStyles.BottomView>
        {this.state.loading && <Loader loadingText={"Loading..."} />}
      </HomeScreenStyles.WrapperViewVertical >
    );
  }
}

export default HomeScreen;
