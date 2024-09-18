/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Icon2 from "react-native-vector-icons/AntDesign";
import AccountStyles from "./AccountStyles";
import {
  MAIN_STACKS,
  SCREEN,
  SCREEN_NAMES,
} from "../../helper/Constant";
import { TEXT } from "../../helper/Color";
import CustomHeader from "../../component/CustomHeader/index";
import Loader from "../../component/Loader";

class Account extends Component {
  constructor() {
    super();
    this.state = {
      selectedRemember: false,
      list: [
        {
          icon: Icon2,
          iconName: "ios-person-outline",
          name: "My Doctors",
          image: require("../../assets/my_doctors.png"),
        },
        {
          icon: Icon2,
          iconName: "calendar",
          name: "Past Appointments",
          image: require("../../assets/my_doctors.png"),
        },
        {
          icon: Icon2,
          iconName: "ios-person-outline",
          name: "Online consultation",
          image: require("../../assets/online_consultation.png"),
        },
        {
          icon: Icon2,
          iconName: "page-edit",
          name: "Medical records",
          image: require("../../assets/medical_records.png"),
        },
        {
          icon: Icon2,
          iconName: "page-edit",
          name: "Reminders",
          image: require("../../assets/reminders.png"),
        },
        {
          icon: Icon2,
          iconName: "page-edit",
          name: "Health interest",
          image: require("../../assets/reminders.png"),
        },
        {
          icon: Icon2,
          iconName: "page-edit",
          name: "My Payments",
          image: require("../../assets/my_payments.png"),
        },
        {
          icon: Icon2,
          iconName: "page-edit",
          name: "Allergies",
          image: require("../../assets/my_payments.png"),
        },
      ],
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.maintainData();
    }, 1000);
  }

  maintainData = async () => {
    this.setState({ loading: true });
    const userWithToken = await JSON.parse(this.props?.user?.userDetail?.userDetails);
    this.setState({
      loading: false,
      user: userWithToken.user,
    });

    if (this.props.user.userRole === "doctor") {
      let previousList = this.state.list;
      previousList[3].name = "My Schedule";
      previousList[0].name = "My patients";
      previousList.pop();
      previousList.pop();
      previousList.pop();
      previousList.push({
        icon: Icon2,
        iconName: "page-edit",
        name: "Offers",
        image: require("../../assets/my_payments.png"),
      });
      this.setState({
        // loading: false,
        list: previousList,
        // user: userWithToken.user
      });
    }
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#ececec",
          marginHorizontal: 10,
        }}
      />
    );
  };

  checkName = (item) => {
    const tempUser = JSON.parse(this?.props?.user?.userDetail?.userDetails);
    if (item.name == "My Doctors" || item.name == "My patients") {
      this.props.navigation.navigate(SCREEN_NAMES.MyDoctors);
    } else if (item.name == "Health Interest") {
      alert('Page is Under Developement')
      // this.props.navigation.navigate('HealthInterust');
    } else if (item.name == "Medical records") {
      this.props.navigation.navigate(SCREEN_NAMES.MedicalRecord, {
        id: tempUser?.user?._id,
      });
    } else if (item.name == "Past Appointments") {
      this.props.navigation.navigate(SCREEN_NAMES.Appointment);
    } else if (item.name == "Reminders") {
      alert('Page is Under Developement')
      // this.props.navigation.navigate(SCREEN_NAMES.MedicalRecord);
    } else if (item.name == "Online consultation") {
      // this.props.navigation.navigate(MAIN_STACKS.ChatStack);
    } else if (item.name == "Forums") {
      alert('Page is Under Developement')
      // this.props.navigation.navigate(SCREEN_NAMES.MedicalRecord);
    } else if (item.name == "My Schedule") {
      this.props.navigation.navigate(SCREEN_NAMES.Schedule);
    } else if (item.name == "Allergies") {
      this.props.navigation.navigate(SCREEN_NAMES.MyAllergies, {
        id: tempUser?.user?._id,
      });
    }
  };

  render() {
    return (
      <AccountStyles.WrapperViewVertical>
        <AccountStyles.TopView>
          <View>
            <CustomHeader
              left="Skip"
              type="icon"
              color={TEXT.primary}
              iconName="user"
              rightType="icon"
              rightIconColor={TEXT.primary}
              rightIconName="setting"
              paddingTop={15}
              paddingBottom={15}
              bgColor={"transparent"}
            />
          </View>
          <AccountStyles.ImageView
            source={this?.state?.user?.profileImg != '' ? {
              uri: this?.state?.user?.profileImg
            } : require('../../assets/default.jpg')}
          />
          <AccountStyles.NameText style={{ fontSize: 20, fontWeight: "700" }}>
            {this?.state?.user?.firstName} {this?.state?.user?.lastName}
          </AccountStyles.NameText>
          <AccountStyles.NameText
            style={{ fontSize: 12, fontWeight: "200", marginTop: 0 }}
          >
            {this.state.user.phoneNo ? this.state.user.phoneNo : ""}
          </AccountStyles.NameText>
        </AccountStyles.TopView>

        <AccountStyles.BottomViewWrapper>
          <AccountStyles.BottomViewInner>
            <FlatList
              data={this.state.list}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.checkName(item);
                  }}
                  style={[
                    {
                      height: 75,
                      padding: 5,
                      width: SCREEN.width - 40,
                      alignSelf: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    },
                    index === this.state.list.length - 1
                      ? { marginBottom: 5 }
                      : {},
                  ]}
                >
                  <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <Image
                      style={{
                        resizeMode: "contain",
                        alignSelf: "center",
                        width: 20,
                        height: 20,
                      }}
                      source={item.image}
                    />
                  </View>
                  <View style={{ flex: 0.6, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "popins",
                        color: TEXT.description,
                        fontSize: 12,
                        marginLeft: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: "center",
                      marginRight: -18,
                      marginTop: 5,
                    }}
                  >
                    <item.icon
                      style={{
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                      name={"right"}
                      size={10}
                      color={TEXT.secondary}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </AccountStyles.BottomViewInner>
        </AccountStyles.BottomViewWrapper>
      </AccountStyles.WrapperViewVertical>
    );
  }
}

function mapStateToProps(state, props) {
  return state;
}

const mapDispatchToProps = (dispatch) => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Account);
