import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Animated from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TEXT } from "../helper/Color";
import { MAIN_STACKS, TOKEN, USERDETAIL, USERID, USERROLE } from "../helper/Constant";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export function DrawerContent(props) {
  const [user, setUser] = useState({});

  const getCurrentUser = async () => {
    let currentUser = await AsyncStorage.getItem(USERDETAIL);
    let currentUserInJson = JSON.parse(currentUser);
    setUser(currentUserInJson.user);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const translateX = Animated.interpolateNode(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  return (
    <DrawerContentScrollView
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#55607B",
      }}
      {...props}
    >
      <View
        style={{
          backgroundColor: "#55607B",
          height: "100%",
          width: "100%",
          marginTop: -55,
        }}
      >
        <Text style={{ backgroundColor: "#6B799C", color: "#6B799C" }}>
          This is temporary going to accomplish new way to do it
        </Text>
        <View
          style={{
            backgroundColor: "#8B9DC4",
            height: "23%",
            width: "60%",
            borderBottomRightRadius: 70,
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 25,
          }}
        >
          <Image
            style={{ height: 45, width: 45, borderRadius: 25, marginLeft: 10 }}
            source={user.profileImg ? {
              uri: user.profileImg
            } : require('../assets/default.jpg')
            }
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                marginLeft: 15,
                fontWeight: "bold",
                marginTop: -5,
                color: TEXT.primary,
                fontSize: 16,
              }}
            >
              {user.firstName ? user.firstName + " " + user.lastName : "Adam"}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                color: TEXT.primary,
                fontSize: 10,
                lineHeight: 18,
              }}
            >
              {user.firstName
                ? user.firstName + " " + user.lastName
                : "Jakarta, Indonesia"}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: "70%",
            width: "60%",
            marginLeft: 10,
            paddingVertical: 100,
          }}
        >
          <DrawerItem
            inactiveTintColor={"#909BB3"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"home-outline"}
                size={20}
                color={"#909BB3"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ paddingLeft: 0 }}
            label="Home"
            labelStyle={{ marginLeft: -10, fontSize: 16 }}
            onPress={() => {
              props.navigation.navigate(MAIN_STACKS.HomeStack);
            }}
          />

          <DrawerItem
            inactiveTintColor={"#909BB3"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"search"}
                size={20}
                color={"#909BB3"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ marginTop: 0, paddingLeft: 0 }}
            label="Notification"
            labelStyle={{ marginTop: -5, marginLeft: -10, fontSize: 16 }}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <DrawerItem
            inactiveTintColor={"#909BB3"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"chatbox-ellipses-outline"}
                size={20}
                color={"#909BB3"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ paddingLeft: 0 }}
            label="Near Me"
            labelStyle={{ marginTop: -5, marginLeft: -10, fontSize: 16 }}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <DrawerItem
            inactiveTintColor={"#909BB3"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"person-outline"}
                size={20}
                color={"#909BB3"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ marginTop: 0, paddingLeft: 0 }}
            label="Forum"
            labelStyle={{ marginLeft: -10, fontSize: 16 }}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate(MAIN_STACKS.ForumStack);
            }}
          />
          {user && user.role === 'user' && <DrawerItem
            inactiveTintColor={"#909BB3"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"settings-outline"}
                size={20}
                color={"#909BB3"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ marginTop: 0, marginVertical: 10, paddingLeft: 0 }}
            label="Setting"
            labelStyle={{ marginLeft: -10, fontSize: 16 }}
            onPress={() => {
              props.navigation.navigate(MAIN_STACKS.HomeStack);
            }}
          />}
        </View>
        <View
          style={{
            backgroundColor: "#55607B",
            height: "15%",
            width: "60%",
            marginLeft: 10,
            flexDirection: "row",
          }}
        >
          <DrawerItem
            inactiveTintColor={"white"}
            activeTintColor={"white"}
            activeBackgroundColor={"#909BB3"}
            icon={({ color, size }) => (
              <Ionicons
                name={"ios-log-out-outline"}
                size={22}
                color={"white"}
                style={{ paddingRight: -30 }}
              ></Ionicons>
            )}
            style={{ margin: 0, marginVertical: 10, paddingLeft: 0 }}
            label="Sign-out"
            labelStyle={{ marginLeft: -12, fontSize: 16 }}
            onPress={async () => {
              let currentUser = await AsyncStorage.getItem(USERDETAIL);
              let currentUserInJson = JSON.parse(currentUser);
              await AsyncStorage.removeItem(USERDETAIL);
              await AsyncStorage.removeItem(TOKEN);
              await AsyncStorage.removeItem(USERID);
              await AsyncStorage.removeItem(USERROLE);
              currentUserInJson.user.googleId && await GoogleSignin.revokeAccess();
              currentUserInJson.user.googleId && await GoogleSignin.signOut();

              props.navigation.replace(MAIN_STACKS.SignInStack);
            }}
          />
        </View>
      </View>

      {/* <View style={{ flexDirection: 'column' }} >
        <View style={[styles.userInfoSection]}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}  
          >
            <View style={{ width: 30, height: 30, backgroundColor: 'red'}}/>
          </TouchableOpacity> 

            <View style={{ flexDirection: 'row', width: '100%', height:'80%', alignItems: 'center', borderBottomRightRadius: 50, backgroundColor: 'red' }}>
              <Image style={{ marginLeft: 20, width: 40, borderRadius: 20, backgroundColor: 'yellow' }}
                source={{
                  uri: user.profileImg ? user.profileImg : 'https://hips.hearstapps.com/esquireuk.cdnds.net/17/06/768x1145/gallery-1486548024-brigitte-bardot.jpg?resize=480:*'
                }}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.title}>{user.firstName ? user.firstName + ' ' + user.lastName : ''}</Text>
              </View>
            </View>

         
           <View style={styles.row}>
          <View style={styles.section}>
            <View style={{ width: 30, height: 30, backgroundColor: 'red' }} />
          </View>
          <View style={styles.section}>
            <Text style={[styles.paragraph, styles.caption]}>
              159
              </Text>
          </View>
        </View> 
        </View>

        <View
          style={{ height: '60%', marginTop: 100 }}
        >
          <DrawerItem
            icon={({ color, size }) => (
              <View style={{ width: 30, backgroundColor: 'red' }} />

            )}
            label="Filter"
            onPress={() => { props.navigation.navigate('a', {
                  screen: 'tab',
                  params: {
                    screen: 'Patient'
                  },
                }); }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <View style={{ width: 30, backgroundColor: 'red' }} />

            )}
            label="Filter"
            onPress={() => { props.navigation.navigate('a', {
                  screen: 'tab',
                  params: {
                    screen: 'Patient'
                  },
                }); }}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <View style={{ width: 30, backgroundColor: 'red' }} />
            )}
            label="Preferences"
            onPress={() => { }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <View style={{ width: 30, backgroundColor: 'red' }} />
            )}
            label="Bookmarks"
            onPress={() => { }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <View style={{ width: 30, backgroundColor: 'red' }} />
            )}
            label="Bookmarks"
            onPress={() => { }}
          />
        </View>


        <View style={{ height: '20%' }} >
          <Text>Sign-out</Text>
        </View>
      </View>
     */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    height: "100%",
    backgroundColor: "#637395",
  },
  userInfoSection: {
    height: "20%",
    marginTop: -55,
  },
  title: {
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {},
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
