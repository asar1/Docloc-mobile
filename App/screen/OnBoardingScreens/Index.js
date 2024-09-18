// import module from '@react-native-firebase/app';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Animated, Easing, TouchableOpacity } from "react-native";
import CustomHeader from "../../component/CustomHeader/index";
import { TEXT, BLUE, BACKGROUND } from "../../helper/Color";
import { ATTENTEDTUTORIAL, MAIN_STACKS } from "../../helper/Constant";
import AsyncStorage from "@react-native-community/async-storage";

const assets = [
  require("../../assets/search_doc.png"),
  require("../../assets/bookAppoint.png"),
  require("../../assets/book_diagonostic.png"),
];

const titles = ["Search Doctors", "Book Appointment", "Book Diagnostics"];

const subTitle = [
  "Get List of best doctor \n nearby you",
  "Book an appointment with a \n right doctor",
  "Search and book diagnostic \n text",
];

const OnBoardingScreens = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [intervalTime, setIntervalTime] = useState(0);
  const [xValue, setxValue] = useState(new Animated.Value(0));
  const [xValueS, setxValueS] = useState(new Animated.Value(500));
  const [xValueT, setxValueT] = useState(new Animated.Value(500));
  const [fTimeout, setfTimeout] = useState(0);
  const [sTimeout, setsTimeout] = useState(0);
  const [tTimeout, settTimeout] = useState(0);
  const [foTimeout, setfoTimeout] = useState(0);

  moveRLF = () => {
    Animated.timing(xValue, {
      toValue: -450,
      duration: 500, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: true,
    }).start();
  };

  moveRLS = (toValue, current) => {
    Animated.timing(current, {
      toValue: toValue,
      duration: 500, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    let first = setTimeout(() => {
      moveRLF();
    }, 3000);
    let second = setTimeout(() => {
      moveRLS(0, xValueS);
      setCurrentPage((currentPage) => currentPage + 1);
    }, 3100);

    let third = setTimeout(() => {
      moveRLS(-500, xValueS);
    }, 6000);
    let fourth = setTimeout(() => {
      this.moveRLS(0, xValueT);
      setCurrentPage((currentPage) => currentPage + 1);
    }, 6100);

    setfTimeout(first);
    setsTimeout(second);
    settTimeout(third);
    setfoTimeout(fourth);

    AsyncStorage.setItem(ATTENTEDTUTORIAL, 'true');
    console.log('set as true');

  }, []);

  const increaseCurrentPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const onSkipPress = () => {
    clearTimeout(fTimeout);
    clearTimeout(sTimeout);
    clearTimeout(tTimeout);
    clearTimeout(foTimeout);
    props.navigation.replace(MAIN_STACKS.SignInStack)
  };
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>

      {console.log(currentPage, "this is current page")}
      <CustomHeader
        right={currentPage < 2 ? "Skip" : ""}
        type="text"
        rightTextStyle={currentPage < 2 ? styles.skipButton : styles.skipDisabledButton}
        onRightPress={currentPage < 2 ? onSkipPress : null}
        paddingTop={25}
      />
      <Animated.View
        style={{
          transform: [{ translateX: xValue }],
          marginTop: 30,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "center",
            paddingVertical: 100,
          }}
        >
          <Image source={assets[0]} style={{ backgroundColor: "white" }} />
        </View>
        <View
          style={{ width: "100%", backgroundColor: "white", marginTop: -60 }}
        >
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: '700'
            }}
          >
            {titles[0]}
          </Text>
          <Text
            style={{
              fontSize: 14,
              alignSelf: "center",
              color: "black",
              textAlign: "center",
              marginTop: 5,
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: 'normal'
            }}
          >
            {subTitle[0]}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          transform: [{ translateX: xValueS }],
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 100,
          }}
        >
          <Image source={assets[1]} />
        </View>
        <View
          style={{ width: "100%", backgroundColor: "white", marginTop: -60 }}
        >
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: '700'
            }}
          >{titles[1]}</Text>
          <Text
            style={{
              fontSize: 14,
              alignSelf: "center",
              color: "black",
              textAlign: "center",
              marginTop: 5,
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: 'normal'
            }}
          >
            {subTitle[1]}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          transform: [{ translateX: xValueT }],
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 100,
          }}
        >
          <Image source={assets[2]} />
        </View>
        <View
          style={{ width: "100%", backgroundColor: "white", marginTop: -60 }}
        >
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: '700'
            }}
          >{titles[2]}</Text>
          <Text
            style={{
              fontSize: 14,
              alignSelf: "center",
              color: "black",
              textAlign: "center",
              marginTop: 5,
              backgroundColor: "white",
              fontFamily: 'Poppins',
              fontWeight: 'normal'
            }}
          >
            {subTitle[2]}
          </Text>
        </View>
      </Animated.View>
      <View
        style={{
          height: "15%",
          width: "100%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        {currentPage > 1 ? <View>
          <TouchableOpacity
            style={{ alignSelf: 'center', height: 50, marginBottom: 20, width: 170, borderRadius: 25, borderColor: '#E5D6FF', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {

              console.log("letting it")
              clearTimeout(fTimeout);
              clearTimeout(sTimeout);
              clearTimeout(tTimeout);
              clearTimeout(foTimeout);
              props.navigation.replace(MAIN_STACKS.SignInStack)
            }}
          >
            <Text style={{ color: '#7A3FE1', fontSize: 14, fontFamily: 'Poppins', fontWeight: '700' }}>
              Let's go
            </Text>
          </TouchableOpacity>

        </View> : <View style={{ height: 50, marginBottom: 20 }} >

        </View>
        }
        <View style={{
          flexDirection: 'row', justifyContent: "center",
          alignItems: "center", marginLeft: -20
        }} >
          {assets.map((source, index) => {
            return (
              <View
                key={source}
                style={
                  currentPage === index ? styles.currentDot : styles.NormalDot
                }
              >

              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentDot: {
    height: 15,
    width: 15,
    marginLeft: 20,
    backgroundColor: "#6E78F7",
    borderRadius: 12.5,
  },
  NormalDot: {
    height: 10,
    width: 10,
    marginLeft: 20,
    backgroundColor: "#6E78F7",
    borderRadius: 7.5,
  },
  skipButton: {
    color: "#6E78F7",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold"
  },
  skipDisabledButton: {
    color: "#6E78F7",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    opacity: 0.25,
  },
});

export default OnBoardingScreens;
