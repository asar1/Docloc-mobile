import React, { Component } from "react";
import { bindActionCreators } from "redux";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Alert,
} from "react-native";
import {
  BLACK,
  WHITE,
  ORANGE,
  GREEN,
  BLUE,
  TEXT,
  BACKGROUND,
} from "../../helper/Color";
import Icon from "react-native-vector-icons/Entypo";
import MedicalRecordsStyle from "./MedicalRecordsStyle";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Calendar,
  CalendarList,
  Agenda,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from "react-native-calendars";
import {
  SCREEN,
  BASE_URL,
  MAIN_STACKS,
  SCREEN_NAMES,
} from "../../helper/Constant";
import Route from "../../Network/route";
import CustomHeader from "../../component/CustomHeader/index";
import { connect } from "react-redux";

const route = new Route(BASE_URL);

class MedicalRecords extends Component {
  _unsubscribe = null;
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      loading: false,
      nextOccurence: false,
      userId: null,
    };
  }

  componentDidMount() {
    // let date = new Date();
    // date = JSON.stringify(date).split('T')[0].substring(1);
    // this.getMedicalRecordsByDate(date)

    // console.log(this.props.user, 'this is props');
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getMedicalRecordsByDate(this.props.route.params.id);
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getMedicalRecordsByDate = (id) => {
    this.setState({ isLoading: true, userId: id });

    route
      .getAuthenticated(
        "user/medical-records-list/" + id,
        this.props.user.userToken
      )
      .then((res) => {
        if (res.status) {
          this.setState({ listData: res.data });
        } else {
          Alert.alert("Info", res.message);
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(JSON.stringify(error), "this is catch in error");
      });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <MedicalRecordsStyle.WrapperViewVertical>
        <MedicalRecordsStyle.TopView>
          <View
            style={{
              backgroundColor: BACKGROUND.primary,
              height: 200,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
            }}
          >
            <CustomHeader
              paddingTop={25}
              paddingBottom={20}
              left="Skip"
              type="icon"
              leftPress={this.goBack}
              color={TEXT.primary}
              iconName="arrowleft"
              inFrontOfLeft="Medical Records"
              bgColor={BACKGROUND.primary}
              inFrontOfLeftStyle={styles.headerTitle}
              width={"80%"}
            />
          </View>
        </MedicalRecordsStyle.TopView>
        <MedicalRecordsStyle.FlatListView>
          <FlatList
            data={this.state.listData}
            renderItem={({ item, index }) => (
              <MedicalRecordsStyle.FlatListRenderItemEndView
                style={index === 0 ? { marginTop: 15 } : {}}
              >
                <MedicalRecordsStyle.TitleView style={{ alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      alignContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                      <Fontisto
                        name={"test-tube"}
                        size={15}
                        color={BACKGROUND.primary}
                      />
                      <Text
                        style={{
                          paddingLeft: "4%",
                          fontSize: 16,
                          color: BACKGROUND.primary,
                          fontWeight: "bold",
                        }}
                      >
                        {item.testName}
                      </Text>
                    </View>
                    <View>
                      {item.attachment.length > 0 &&
                        <View
                          style={{
                            height: 32,
                            width: 32,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 4,
                            backgroundColor: TEXT.primary,
                          }}
                        >
                          <Entypo
                            name={"attachment"}
                            size={18}
                            color={BACKGROUND.primary}
                            onPress={() => {
                              // if (item.attachment.length > 0) {
                              this.props.navigation.navigate(
                                SCREEN_NAMES.Gallery,
                                {
                                  attachments: item.attachment,
                                }
                              );
                              // } else {
                              //   ToastAndroid.show(
                              //     "No attachments to show",
                              //     ToastAndroid.SHORT
                              //   );
                              // }
                            }}
                          />
                        </View>
                      }
                    </View>
                  </View>
                </MedicalRecordsStyle.TitleView>

                <MedicalRecordsStyle.TitleView style={{ alignItems: "center" }}>
                  <Fontisto name={"calendar"} size={18} color={"gray"} />
                  <Text
                    style={{
                      marginLeft: "3%",
                      fontSize: 12,
                      color: TEXT.subHeading,
                      fontWeight: "bold",
                    }}
                  >
                    {JSON.stringify(item.date).split("T")[0].substring(1)}
                  </Text>
                </MedicalRecordsStyle.TitleView>

                <MedicalRecordsStyle.TitleView style={{ marginTop: 8 }}>
                  <Icon1
                    name={"ios-location-outline"}
                    size={18}
                    color={"gray"}
                  />
                  <Text
                    style={{
                      marginLeft: "3%",
                      fontSize: 12,
                      color: TEXT.subHeading,
                    }}
                  >
                    {item.from}
                  </Text>
                </MedicalRecordsStyle.TitleView>
                <MedicalRecordsStyle.TitleView>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{ marginLeft: "21%", fontSize: 12, color: "gray" }}
                    >
                      {item.notes}
                    </Text>
                  </View>
                </MedicalRecordsStyle.TitleView>
              </MedicalRecordsStyle.FlatListRenderItemEndView>
            )}
          />
        </MedicalRecordsStyle.FlatListView>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate(SCREEN_NAMES.AddMedicalRecord, {
              patient: this.state.userId,
            })
          }
        >
          <Text style={styles.buttonText}>Add Medical Record</Text>
        </TouchableOpacity>
      </MedicalRecordsStyle.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({
  nextOccurenceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    // backgroundColor: 'yellow',
  },
  nextOccurenceButton: {
    backgroundColor: BACKGROUND.primary,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    color: TEXT.primary,
    fontSize: 18,
  },
  buttonText: {
    // fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: "60%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: BACKGROUND.primary,
    backgroundColor: BACKGROUND.primary,
    position: "absolute",
    bottom: 25,
  },
});

function mapStateToProps(state, props) {
  return state;
}

const mapDispatchToProps = (dispatch) => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(MedicalRecords);
