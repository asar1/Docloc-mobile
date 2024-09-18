import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  BackHandler,
  ToastAndroid,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Ionicons";
import CustomHeader from "../../component/CustomHeader";
import { DrawerActions } from "@react-navigation/routers";
import { BACKGROUND, TEXT } from "../../helper/Color";
import {
  BASE_HOST_URL,
  BASE_URL,
  MAIN_STACKS,
  PopUpMenuOfDoctor,
  SCREEN_NAMES,
  TEM_TOKEN,
  TOKEN,
  USERDETAIL,
  USERID,
} from "../../helper/Constant";
import Route from "../../Network/route";
import Fontisto from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import SmallPopUp from "../../component/wholeScreenModal";
import AsyncStorage from "@react-native-community/async-storage";

const route = new Route(BASE_URL);

class DoctorDashboard extends Component {
  _unsubscribe = null;
  _unsubscribe2 = null;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      resultsToShow: [],
      user: {},
      currentList: "booked",
      popup: false,
      booked: 0,
      cancelled: 0,
      attended: 0,
      item: null,
      status: {
        status: "cancelled",
        text: "I am not available.",
      },
      showStatusUpdate: false,
      backPressed: 0,
    };
  }

  async componentDidMount() {
    let currentUser = await AsyncStorage.getItem(USERDETAIL);
    let currentUserInJson = JSON.parse(currentUser);
    this.setState({ user: currentUserInJson.user });
    this.getDoctorAppointments();
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

  handleBackButton = () => {
    if (this.state.backPressed === 1) {
      BackHandler.exitApp();
    } else {
      ToastAndroid.show("Press again to exit app.", ToastAndroid.SHORT);
      this.setState({ backPressed: 1 });
    }

    return true;
  };

  onPressMenu = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  onProfileimageClick = () => {
    this.props.navigation.navigate(MAIN_STACKS.AccountStack);
  };

  onClickListType = (listType) => {
    this.setState({
      resultsToShow: this.state.list.filter((x) => x.status === listType),
      currentList: listType,
    });
  };

  getDoctorAppointments = () => {
    route
      .get(`user/doctor-appointments/${this.state.user._id}/${new Date()}`)
      .then((res) => {
        if (res.status) {
          if (res.data.length > 0) {
            let booked = res.data.filter((x) => x.status === "booked");
            let cancelled = res.data.filter(
              (x) => x.status === "cancelled"
            ).length;
            let attended = res.data.filter(
              (x) => x.status === "attended"
            ).length;

            this.setState({
              list: res.data,
              resultsToShow: booked,
              booked: booked.length,
              cancelled: cancelled,
              attended: attended,
            });
          } else {
          }
        } else {
          Alert.alert("Error", JSON.stringify(res.message));
        }
      })
      .catch((err) => {
        Alert.alert("Error", JSON.stringify(err));
      });
  };

  onPressCard = (item) => {
    this.setState({ popup: true, item: item });
  };

  onPressCardItem = () => {
    this.setState({ popup: false });
  };

  onStatusPressed = () => {
    this.setState({ showStatusUpdate: false });
  };

  cancelAppointment = (status) => {
    route
      .put(
        `appointment/`,
        { id: this.state.item._id, status: status },
        this.props.user.userToken
      )
      .then((res) => {
        if (res.status) {
          this.getDoctorAppointments();
        } else {
          Alert.alert("Error", JSON.stringify(res.message));
        }
      })
      .catch((err) => {
        Alert.alert("Error", JSON.stringify(err));
      });
  };

  onChangeStatus = (text) => {
    let obj = { text };
    if (text === "I am not available.") {
      obj["status"] = "cancelled";
      this.setState({ status: obj });
    } else if (text === "Patient not available.") {
      obj["status"] = "cancelled";
      this.setState({ status: obj });
    } else if (text === "Appoinment completed.") {
      obj["status"] = "attended";
      this.setState({ status: obj });
    }
  };

  onAddMedicalRecord = () => {
    this.setState({ showStatusUpdate: false });
    this.props.navigation.navigate(SCREEN_NAMES.AddMedicalRecord, {
      patient: this.state.item.patient._id,
      appointment: this.state.item._id,
    });
  };

  updateAppointmentStatus = () => {
    route
      .put(
        'appointment',
        { id: this.state.item._id, status: this.state.status.status },
        this.props.user.userToken
      )
      .then((res) => {
        if (res.status) {
          this.getDoctorAppointments();
          this.setState({ showStatusUpdate: false });
        } else {
          Alert.alert("Error", JSON.stringify(res.message));
        }
      })
      .catch((err) => {
        Alert.alert("Error", JSON.stringify(err));
      });
  };

  timeManipulation = (item) => {
    // let to = "23:30";
    return '23:00' + ' ' + '12:00'
    // let time = new Date("2000-01-01" + item?.timeSlot + "Z");
    // time.setMinutes(time.getMinutes() + item?.schedule?.timeToEntertainSlot);
    // let newTo = time.toISOString().substr(11, 5);
    // return `${item?.timeSlot} - ${newTo}`
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: BACKGROUND.primary,
            paddingVertical: 20,
            height: 150,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <CustomHeader
            left="Skip"
            leftPress={this.onPressMenu}
            type="icon"
            color={TEXT.primary}
            iconName="menuunfold"
            rightType="img"
            rightImage={this.state.user.profileImg}
            bgColor={BACKGROUND.primary}
            rightImageClick={this.onProfileimageClick}
          />
          <View style={{ marginTop: 15 }}>
            <Text style={styles.heading}>Today's</Text>
            <Text style={styles.subheading}>Appointments</Text>
          </View>
        </View>
        <View
          style={{ height: 45, justifyContent: "center", marginVertical: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              width: "70%",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={[
                { justifyContent: "center", marginHorizontal: 10 },
                this.state.currentList === "attended"
                  ? {
                    backgroundColor: BACKGROUND.primary,
                    elevation: 6,
                    borderRadius: 50,
                  }
                  : {},
              ]}
            >
              <Text
                onPress={() => this.onClickListType("attended")}
                style={[
                  {
                    alignSelf: "center",
                    color: "green",
                    fontWeight: "bold",
                    padding: 10,
                  },
                  this.state.currentList === "attended"
                    ? { color: "white" }
                    : {},
                ]}
              >
                {this.state.attended} Attended
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: "black" }} />
            <View
              style={[
                { justifyContent: "center", marginHorizontal: 10 },
                this.state.currentList === "booked"
                  ? {
                    backgroundColor: BACKGROUND.primary,
                    elevation: 6,
                    borderRadius: 50,
                  }
                  : {},
              ]}
            >
              <Text
                onPress={() => this.onClickListType("booked")}
                style={[
                  {
                    alignSelf: "center",
                    color: "black",
                    fontWeight: "bold",
                    padding: 10,
                  },
                  this.state.currentList === "booked" ? { color: "white" } : {},
                ]}
              >
                {this.state.booked} Upcoming
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: "black" }} />
            <View
              style={[
                { justifyContent: "center", marginHorizontal: 10 },
                this.state.currentList === "cancelled"
                  ? {
                    backgroundColor: BACKGROUND.primary,
                    elevation: 6,
                    borderRadius: 50,
                  }
                  : {},
              ]}
            >
              <Text
                onPress={() => this.onClickListType("cancelled")}
                style={[
                  {
                    alignSelf: "center",
                    color: "red",
                    fontWeight: "bold",
                    padding: 10,
                  },
                  this.state.currentList === "cancelled"
                    ? { color: "white" }
                    : {},
                ]}
              >
                {this.state.cancelled} skiped
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: "100%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#FFFFFF",
          }}
        >
          {this.state.resultsToShow.length > 0 ? (
            <FlatList
              style={{ height: "90%", marginBottom: 20 }}
              data={this.state.resultsToShow}
              contentContainerStyle={{ paddingVertical: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.onPressCard(item)}
                  style={styles.thread}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={item?.patient?.profileImg != '' ? { uri: item?.patient?.profileImg } : require('../../assets/default.jpg')}
                      style={styles.imageStyle}
                    />
                  </View>
                  <View style={styles.messageContainer}>
                    <Text style={styles.doctorName}>
                      {item.patient.firstName} {item.patient.lastName}
                    </Text>
                    <Text style={styles.messageText}>{item.notes}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>
                        <Icon3
                          name={"time-sharp"}
                          color={BACKGROUND.primary}
                          size={17}
                        />
                      </Text>
                      <Text style={styles.slotTime}>Slot: {this.timeManipulation(item)}
                        {/* {item?.timeSlot} - {item?.timeSlot + 30} */}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.timeBeforeContainer]}>
                    <AntDesign name={"right"} size={20} color={"blue"} />
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: "50%",
              }}
            >
              <Text>No appointments today</Text>
            </View>
          )}
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.popup}
            onRequestClose={() => {
              this.onPressCardItem();
            }}
          >
            <View style={styles.centeredView}>
              <Pressable
                style={styles.modalEmpty}
                onPress={() => this.onPressCardItem()}
              ></Pressable>
              <View style={styles.modalView}>
                <View
                  style={{
                    alignSelf: "center",
                    backgroundColor: "white",
                    elevation: 8,
                    width: "100%",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                >
                  <FlatList
                    data={PopUpMenuOfDoctor}
                    renderItem={({ item }) => (
                      <View>
                        <Pressable
                          style={{ width: "100%", justifyContent: "center" }}
                          onPress={() => {
                            if (item.text === "Call") {
                              this.onPressCardItem();
                            } else if (item.text === "Message") {
                              this.setState({ popup: false });
                              this.props.navigation.navigate(
                                SCREEN_NAMES.ChatSpecific,
                                {
                                  img: this.state.item.patient.profileImg,
                                  name:
                                    this.state.item.patient.firstName +
                                    " " +
                                    this.state.item.patient.lastName,
                                  userId: this.state.item.patient._id,
                                  from: "doctor",
                                }
                              );
                            } else if (item.text === "Attachments") {
                              this.setState({ popup: false });
                              const gallery = [];
                              for (
                                let index = 0;
                                index < this.state.item.attachments.length;
                                index++
                              ) {
                                const element =
                                  this.state.item.attachments[index];
                                gallery.push({
                                  src: element,
                                  type: "image",
                                });
                              }
                              this.props.navigation.navigate(
                                SCREEN_NAMES.Gallery,
                                {
                                  attachments: this.state.item.attachments,
                                }
                              );
                            } else if (item.text === "Medical Records") {
                              this.setState({ popup: false });
                              this.props.navigation.navigate(
                                SCREEN_NAMES.MedicalRecord,
                                {
                                  id: this.state.item.patient._id,
                                }
                              );
                            } else if (item.text === "Allergies") {
                              this.setState({ popup: false });
                              this.props.navigation.navigate(
                                SCREEN_NAMES.MyAllergies,
                                {
                                  id: this.state.item.patient._id,
                                }
                              );
                            } else if (item.text === "Cancel Appointment") {
                              this.setState({ popup: false });
                              if (this.state.item.status === "booked") {
                                this.cancelAppointment("cancelled");
                              } else if (
                                this.state.item.status === "cancelled"
                              ) {
                                Alert.alert("Appoinment already cancelled.");
                              } else if (
                                this.state.item.status === "attended"
                              ) {
                                Alert.alert("Appoinment already attended.");
                              }
                            } else if (
                              item.text === "Update Appointment Status"
                            ) {
                              this.setState({ popup: false });
                              if (this.state.item.status === "booked") {
                                this.setState({ showStatusUpdate: true });
                              } else if (
                                this.state.item.status === "cancelled"
                              ) {
                                Alert.alert("Appoinment already cancelled.");
                              } else if (
                                this.state.item.status === "attended"
                              ) {
                                Alert.alert("Appoinment already attended.");
                              }
                            }
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 10,
                              marginLeft: 20,
                            }}
                          >
                            <Fontisto
                              name={item.icon}
                              size={18}
                              color={"gray"}
                            />
                            <Text
                              style={{
                                marginLeft: 30,
                                color: "gray",
                                fontSize: 15,
                              }}
                            >
                              {item.text}
                            </Text>
                          </View>
                        </Pressable>
                        <View
                          style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "#f5f5f5",
                            marginTop: 10,
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <SmallPopUp
          addMedicalRecord={this.onAddMedicalRecord}
          showStatusUpdate={this.state.showStatusUpdate}
          onStatusPressed={this.onStatusPressed}
          onChangeStatus={this.onChangeStatus}
          updateAppointmentStatus={this.updateAppointmentStatus}
          status={this.state.status}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 60,
    color: "white",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 60,
    color: "white",
    fontWeight: "bold",
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  listView: {
    backgroundColor: "white",
    borderRadius: 20,
    height: 100,
    marginBottom: 20,
    elevation: 6,
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  thread: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "90%",
    padding: 15,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 15,
    borderColor: "#ECECEC",
    borderWidth: 1,
  },
  imageContainer: {
    width: "15%",
  },
  messageContainer: {
    width: "80%",
    paddingLeft: 7,
  },
  doctorName: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "700",
  },
  messageText: {
    fontFamily: "Poppins",
    fontSize: 10,
    fontWeight: "700",
    color: "#C9CACC",
    paddingLeft: "4%",
  },
  slotTime: {
    fontFamily: "Poppins-Bold",
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    paddingLeft: "4%",
  },
  timeBeforeContainer: {
    width: "5%",
    justifyContent: "center",
  },
  imageStyle: {
    height: 40,
    width: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalEmpty: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
});

function mapStateToProps(state, props) {
  return state;
}

const mapDispatchToProps = (dispatch) => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(DoctorDashboard);
