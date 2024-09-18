/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BACKGROUND, TEXT } from "../../helper/Color";
import CustomHeader from "../../component/CustomHeader";
import { ScrollView } from "react-native-gesture-handler";
import Route from "../../Network/route";
import { BASE_URL, SCREEN_NAMES, USERDETAIL } from "../../helper/Constant";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satureday",
  "Sunday",
];

const MySchedule = (props) => {
  const [avialbleDays, setAvailableDays] = useState([]);

  const [currentSlotTime, setCurrentSlotTime] = useState("Morning");

  const [slots, setCurrentSlots] = useState([]);

  const [morningSlots, setMorningSlots] = useState([]);
  const [morning, setMorning] = useState([]);
  const [afternoon, setAfternoon] = useState([]);
  const [evening, setEvening] = useState([]);
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");

  const goBack = () => {
    props.navigation.goBack();
  };

  const makeSlots = (time) => {
    const morningSlotTime = [];
    console.log(time, "time");

    if (time.length > 0) {
      for (let tIndex = 0; tIndex < time.length; tIndex++) {
        const element = time[tIndex];
        for (let index = element.from; index < element.to; index++) {
          let minutes = element.timeToEntertainSlot;

          index === element.from && morningSlotTime.push(`${index}:00`);

          do {
            if (minutes === 60) {
              morningSlotTime.push(`${index + 1}:00`);
            } else {
              morningSlotTime.push(`${index}:${minutes}`);
            }
            minutes = minutes + element.timeToEntertainSlot;
          } while (minutes <= 60);
        }
        morningSlotTime.pop();
      }
    }

    return morningSlotTime;
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => await getSchedule())();
      // getSchedule()
    }
  }, [isFocused]);

  const getSchedule = async () => {
    let currentUser = await AsyncStorage.getItem(USERDETAIL);
    let currentUserInJson = JSON.parse(currentUser);
    route
      .getAuthenticated(
        "schedule/" + currentUserInJson.user._id,
        user.userToken
      )
      .then((res) => {
        if (res.status) {
          setAvailableDays(res.data.avialbleDays);
          console.log(res.data, "data");
          if (res.data.slots.length > 0) {
            setMorningSlots(res.data.slots);
          }
        } else {
          Alert.alert("Error", res.message);
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  const changeCurrentSlotTime = (time) => {
    let slotsToShow = [];
    if (time === "Morning") {
      slotsToShow = makeSlots(morning);
    } else if (time === "Afternoon") {
      slotsToShow = makeSlots(afternoon);
    } else {
      slotsToShow = makeSlots(evening);
    }

    setMorningSlots(slotsToShow);
    setCurrentSlotTime(time);
  };

  useEffect(() => {
    (async () => await getSchedule())();
  }, []);

  useEffect(() => {
    if (userId) {
      (async () => await getSchedule(userId))();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomHeader
          paddingTop={25}
          paddingBottom={20}
          left="Skip"
          type="icon"
          leftPress={goBack}
          color={TEXT.primary}
          iconName="arrowleft"
          inFrontOfLeft="My Schedule"
          bgColor={BACKGROUND.primary}
          inFrontOfLeftStyle={styles.headerTitle}
          width={"80%"}
        />
      </View>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.availabilitySection}>
          <Text style={styles.heading}>Availability</Text>
          <View style={styles.availableDays}>
            {days.map((day, index) => (
              <View
                key={day}
                style={[
                  styles.availableDayWrapper,
                  avialbleDays.filter((x) => x.day === day).length > 0 &&
                  avialbleDays.filter((x) => x.day === day)[0]
                    .availability === "unavailable" &&
                  styles.isAvailableWrapper,
                ]}
              >
                <Text key={index} style={styles.availableDay}>
                  {day.charAt(0)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.appointmentSlotSection}>
          <Text style={styles.heading}>Appointment Slots</Text>
          {/* <View style={styles.slotSection}>
                        <View style={styles.slotPartion}>
                            <View style={[styles.eachSlotPartion, currentSlotTime === "Morning" && styles.currentSelectedPartion]}>
                                <TouchableOpacity onPress={() => changeCurrentSlotTime("Morning")} >
                                    <Text style={[styles.slotHeading, currentSlotTime === "Morning" && styles.currentSelectedPartionText]} >
                                        Morning
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.eachSlotPartion, currentSlotTime === "Afternoon" && styles.currentSelectedPartion]}>
                                <TouchableOpacity onPress={() => changeCurrentSlotTime("Afternoon")} >
                                    <Text style={[styles.slotHeading, currentSlotTime === "Afternoon" && styles.currentSelectedPartionText]} >
                                        Afternoon
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.eachSlotPartion, currentSlotTime === "Evening" && styles.currentSelectedPartion]}>
                                <TouchableOpacity onPress={() => changeCurrentSlotTime("Evening")} >
                                    <Text style={[styles.slotHeading, currentSlotTime === "Evening" && styles.currentSelectedPartionText]} >
                                        Evening
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> */}
        </View>

        <ScrollView contentContainerStyle={styles.slotTimes}>
          {console.log(morningSlots.length, "length")}
          {morningSlots.length > 0 &&
            morningSlots.map((slot, index) => {
              return (
                <View key={index} style={styles.eachSlotTime}>
                  <Text style={styles.time}>{slot.text}</Text>
                </View>
              );
            })}
        </ScrollView>
        {morningSlots.length === 0 && (
          <View style={styles.noSlotsAvailable}>
            <Text>No slots available</Text>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.navigate(SCREEN_NAMES.EditSchedule);
          }}
        >
          <View
            style={{
              width: 186,
              height: 40,
              borderRadius: 50,
              marginBottom: 20,
              backgroundColor: BACKGROUND.primary,
              // padding: 20,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: TEXT.primary,
                fontWeight: "bold",
              }}
            >
              Edit
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {morningSlots.length === 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate(SCREEN_NAMES.EditSchedule);
            }}
          >
            <View
              style={{
                width: 186,
                height: 40,
                borderRadius: 50,
                marginBottom: 20,
                backgroundColor: BACKGROUND.primary,
                // padding: 20,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: TEXT.primary,
                  fontWeight: "bold",
                }}
              >
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: BACKGROUND.primary,
    width: "100%",
    height: 90,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
    fontWeight: "700",
    color: TEXT.primary,
  },
  availabilitySection: {
    padding: 20,
  },
  availableDays: {
    flexDirection: "row",
    paddingTop: 20,
    flexWrap: "wrap",
  },
  heading: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: TEXT.secondary,
  },
  slotHeading: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: BACKGROUND.primary,
  },
  availableDay: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: TEXT.primary,
  },
  availableDayWrapper: {
    height: 37,
    width: 37,
    backgroundColor: BACKGROUND.primary,
    borderRadius: 18.5,
    marginLeft: 13,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  isAvailableWrapper: {
    backgroundColor: BACKGROUND.disabled,
  },
  appointmentSlotSection: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  slotPartion: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 40,
    borderRadius: 20,
    backgroundColor: TEXT.primary,
    alignItems: "center",
    elevation: 4,
  },
  slotSection: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  eachSlotPartion: {
    width: "34%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
  },
  currentSelectedPartion: {
    backgroundColor: BACKGROUND.primary,
    borderRadius: 20,
  },
  currentSelectedPartionText: {
    color: TEXT.primary,
  },
  slotTimes: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    paddingLeft: 10,
  },
  eachSlotTime: {
    backgroundColor: TEXT.primary,
    height: 45,
    width: "25%",
    marginVertical: 10,
    marginLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  time: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
    color: TEXT.time,
  },
  noSlotsAvailable: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MySchedule;
