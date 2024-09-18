import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  LogBox
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BACKGROUND, BLUE } from "../../helper/Color";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "react-native-image-picker";
import {
  BASE_HOST_URL,
  BASE_URL,
  MAIN_STACKS,
  TOKEN,
  USERDETAIL,
  USERID,
  USERROLE,
} from "../../helper/Constant";
import Route from "../../Network/route";
import { connect } from "react-redux";
import * as Types from "../../redux/actions/types";
import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from '@react-native-picker/picker';

const route = new Route(BASE_URL);

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
];

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg:
        "https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*",
      gender: "Male",
      category: [
        {
          itemName: "Male",
        },
        {
          itemName: "Female",
        },
      ],
      selectedSpec: {},
      Speciality: [],
      mainSpeciality: [],
      selectedSpeciality: {},
      showDatePicker: false,
      dobDisplayValue: "DD-MMM-YYYY",
      dob: new Date(-713040094989),
      showSpec: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      fee: "",
      bio: "",
      experience: "",
      pmdc: "",
      role: "doctor",
    };
    this.setValue = this.setValue.bind(this);
  }

  onChange = (e, name) => {
    this.setState({ [name]: e });
  };

  setOpen = (open) => {
    this.setState({
      open,
    });
  };

  setValue = (callback) => {
    this.setState((state) => ({
      value: callback(state.value),
    }));
  };

  setItems = (callback) => {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  };

  async onValueChangeCat(value) {
    this.setState({ selectedcat: value });
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const params = this.props.route.params;
    this.setState({
      role: params.params.role,
      phoneNo: params.params.phoneNo,
    });

    this.getAllSpecialties();
  }

  convertDate = (dateInString) => {
    let date = new Date(dateInString);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day}-${months[month]}-${year}`;
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
          base64: response.base64,
        };

        this.setState({ profileImg: response.uri });

        try {
          fetch(`${BASE_HOST_URL}/api/open/upload-chat-image`, {
            headers: {
              // Authorization: `Bearer ${this.props.user.userToken}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(photo),
          })
            .then((response) => {
              response.json().then((res) => {
                if (res.data.length > 0) {
                  this.setState({ profileImg: res.data[0] });
                }
              });
            })
            .catch((e) => {
              console.log(e, "error");
            });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });
  };

  onChangeSpeciality = (txt) => {
    let specialities = this.state.mainSpeciality;
    specialities = specialities.filter((x) =>
      x.speciality.toLowerCase().includes(txt.toLowerCase())
    );
    let fullObj = specialities.find(
      (x) => x.speciality.toLowerCase() === txt.toLowerCase()
    );
    if (fullObj) {
      this.setState({ Speciality: specialities, selectedSpec: fullObj });
    } else {
      this.setState({
        Speciality: specialities,
        selectedSpec: { speciality: txt },
      });
    }
  };

  getAllSpecialties = () => {
    route
      .get("open/speciality")
      .then((res) => {
        if (res.status === 0) {
          Alert.alert("Error", JSON.stringify(res.message));
        } else {
          this.setState({ Speciality: res.data, mainSpeciality: res.data });
        }
      })
      .catch((error) => alert(JSON.stringify(error)));
  };

  onSubmit = () => {
    let {
      profileImg,
      gender: selectedcat,
      dob,
      firstName,
      lastName,
      email,
      phoneNo,
      fee,
      bio,
      experience,
      pmdc,
      role,
    } = this.state;

    let reqBody = {};

    Object.assign(reqBody, {
      profileImg: '',
      gender: selectedcat,
      dob,
      firstName,
      lastName,
      email,
      phoneNo,
      fee,
      bio,
      experience,
      pmdc,
      role,
    });

    reqBody.specialities = this.state.selectedSpec._id
      ? [this.state.selectedSpec._id]
      : [];

    if (this.state.dobDisplayValue === "DD-MMM-YYYY") {
      reqBody.dob = null;
    }
    else {
      reqBody.dob = reqBody.dob.toString().split('T')[0];
    }
    route
      .postdata("auth/signup", reqBody)
      .then(async (res) => {
        if (res.status) {
          this.props.setToken(res.data.token);
          this.props.setRole(
            res.data.user.role === "user" ? "patient" : "doctor"
          );
          this.props.setUser(res.data.user);

          await AsyncStorage.setItem(TOKEN, res.data.token);
          await AsyncStorage.setItem(USERDETAIL, JSON.stringify(res.data));
          await AsyncStorage.setItem(USERID, res.data.user._id);

          await AsyncStorage.setItem(USERROLE, res.data.user.role === 'user' ? 'patient' : 'doctor');
          this.props.navigation.navigate(MAIN_STACKS.DrawerStack);
        } else {
          Alert.alert("Error", res.message);
        }
      })
      .catch((err) => {
        console.log(err, "error");
        Alert.alert("Error", JSON.stringify(err));
      });
  };

  render() {
    const { open, value, items } = this.state;
    return (
      <ScrollView
        style={{ backgroundColor: "#f5f5f5" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: BACKGROUND.primary,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            paddingBottom: 20,
          }}
        >
          <View
            style={[
              styles.backArrow,
              { flexDirection: "row", marginLeft: 20, marginTop: 30 },
            ]}
          >
            <Ionicons name={"arrow-back"} size={25} color={"white"}></Ionicons>
            <Text
              style={{
                marginLeft: 15,
                fontWeight: "bold",
                color: "white",
                fontSize: 20,
              }}
            >
              {" "}
              Profile{" "}
            </Text>
          </View>
          <View
            style={{
              height: 120,
              width: 120,
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            <Image
              style={{
                height: 120,
                width: 120,
                borderRadius: 70,
                marginRight: 10,
                borderWidth: 2,
                borderColor: "white",
                justifyContent: "flex-end",
                alignSelf: "center",
              }}
              source={{ uri: this.state.profileImg }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 25,
                elevation: 3,
                backgroundColor: "white",
                position: "absolute",
                right: 0,
                bottom: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => {
                  this.selectFile();
                }}
                style={{ width: "70%", paddingLeft: 2 }}
                name={"md-camera-sharp"}
                size={25}
                color={BACKGROUND.primary}
              ></Ionicons>
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            borderRadius: 20,
            elevation: 4,
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View>
            <Text style={styles.inputText}>First Name</Text>
            <TextInput
              value={this.state.firstName}
              onChangeText={(e) => {
                this.onChange(e, "firstName");
              }}
              maxLength={50}
              placeholder="Enter your first name"
              style={styles.input}
            // onChangeText={(e) => {
            //     this.setState({ name: e })
            // }}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Last Name</Text>
            <TextInput
              value={this.state.lastName}
              onChangeText={(e) => {
                this.onChange(e, "lastName");
              }}
              placeholder="Enter your last name"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              value={this.state.email}
              onChangeText={(e) => {
                this.onChange(e, "email");
              }}
              placeholder="abc@gmail.com"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Phone #</Text>
            <TextInput
              value={this.state.phoneNo}
              onChangeText={(e) => {
                this.onChange(e, "phoneNo");
              }}
              placeholder="+9223xxxx"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.inputText}>Dob</Text>
            <View style={styles.input}>
              <Text
                onPress={() => this.setState({ showDatePicker: true })}
                style={[
                  { color: "#8e8e8e", paddingVertical: 15 },
                  this.state.dobDisplayValue !== "DD-MMM-YYYY"
                    ? { color: "black" }
                    : {},
                ]}
              >
                {this.state.dobDisplayValue}
              </Text>
            </View>
            {this.state.showDatePicker ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.dob}
                mode={"date"}
                onChange={(e, d) => {
                  if (d) {
                    this.setState({
                      dob: d,
                      dobDisplayValue: this.convertDate(d),
                      showDatePicker: false,
                    });
                  }
                }}
              />
            ) : null}
          </View>
          <Text style={styles.inputText}>Gender</Text>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#ECECEC",
              paddingLeft: 10,
              height: 47,
            }}
          >
            <Picker
              itemStyle={styles.itemStyle}
              mode="dropdown"
              // style={styles.pickerStyle}
              selectedValue={this.state.gender}
              onValueChange={this.onValueChangeCat.bind(this)}
            >
              {this.state.category.map((item, index) => (
                <Picker.Item
                  key="{item}"
                  color="grey"
                  label={item.itemName}
                  value={item.itemName}
                  index={index}
                />
              ))}
            </Picker>
          </View>
          {this.state.role === "doctor" && (
            <View>
              <Text style={[styles.inputText, { paddingBottom: 0 }]}>
                Speciality
              </Text>
              <TextInput
                onFocus={() => this.setState({ showSpec: true })}
                placeholder="Enter your speciality"
                style={styles.input}
                onChangeText={(e) => {
                  this.onChangeSpeciality(e);
                }}
                value={this.state.selectedSpec.speciality}
              />
              {this.state.showSpec && (
                <SafeAreaView
                  style={{
                    width: "100%",
                    borderColor: "#ECECEC",
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderRadius: 20,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    marginTop: -10,
                  }}
                >
                  <FlatList
                    data={this.state.Speciality}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              selectedSpec: this.state.Speciality[index],
                              showSpec: false,
                            });
                          }}
                        >
                          <Text style={{ padding: 10, paddingLeft: 17 }}>
                            {item.speciality}
                          </Text>
                          <View
                            style={[
                              { backgroundColor: "#ECECEC" },
                              index === this.state.Speciality.length - 1
                                ? { borderWidth: 0 }
                                : { height: 1 },
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </SafeAreaView>
              )}
              <View>
                <Text style={styles.inputText}>Experience</Text>
                <TextInput
                  value={this.state.experience}
                  onChangeText={(e) => {
                    this.onChange(e, "experience");
                  }}
                  placeholder="Enter Your Experience"
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.inputText}>PMDC #</Text>
                <TextInput
                  value={this.state.pmdc}
                  onChangeText={(e) => {
                    this.onChange(e, "pmdc");
                  }}
                  placeholder="Enter something"
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.inputText}>Fee</Text>
                <TextInput
                  value={this.state.fee}
                  onChangeText={(e) => {
                    this.onChange(e, "fee");
                  }}
                  placeholder="Enter fee"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.inputText}>Bio</Text>
                <TextInput
                  value={this.state.bio}
                  onChangeText={(e) => {
                    this.onChange(e, "bio");
                  }}
                  multiline={true}
                  numberOfLines={6}
                  placeholder="Something about yourself..."
                  style={[
                    styles.input,
                    { textAlignVertical: "top", paddingTop: 17 },
                  ]}
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onSubmit()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default connectComponent(UpdateUser);

const styles = StyleSheet.create({
  TopAbsoluteView: {
    height: 462,
    width: 462,
    borderRadius: 231,
    backgroundColor: BLUE.app,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 80,
    paddingLeft: 20,
    // position: 'absolute',
    top: -280,
    left: -70,
  },
  heading: {
    color: "white",
    fontSize: 25,
  },
  itemStyle: {
    fontSize: 8,
    fontFamily: "roboto",
    color: "gray",
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: "gray",
    fontSize: 8,
    // fontFamily: "Roboto-Regular"
  },
  input: {
    marginBottom: 7,
    borderRadius: 10,
    paddingLeft: 20,
    // elevation: 0.5,
    borderColor: "#ECECEC",
    borderWidth: 1,
    color: "gray",
  },
  inputText: {
    color: BACKGROUND.primary,
    fontWeight: "bold",
    marginLeft: 5,
    marginVertical: 10,
  },
  doctorButton: {
    height: 30,
    width: "50%",
    borderRadius: 10,
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
    marginTop: 60,
  },
  buttonText: {
    // fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
