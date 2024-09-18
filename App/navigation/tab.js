import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconName from "react-native-vector-icons/Ionicons";
import {
  ChatStackNavigator,
  DoctorAccountStackNavigator,
  HomeForDoctorStackNavigator,
  HomeForPatientStackNavigator,
  PatientAccountStackNavigator,
} from "./stack";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MAIN_STACKS, SCREEN_NAMES } from "../helper/Constant";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getTabBarVisibilityForHomeStack = (route) => {
    console.log(route, "---------", "route");
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName, "---------", "focused route");

    if (
      routeName === undefined ||
      routeName === SCREEN_NAMES.Home ||
      routeName === SCREEN_NAMES.DoctorDashboard
    ) {
      return true;
    }

    return false;
  };

  const getTabBarVisibilityForChatStack = (route) => {
    console.log(route, "---------", "route");
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName, "---------", "focused route");

    if (routeName === undefined || routeName === SCREEN_NAMES.Inbox) {
      return true;
    }

    return false;
  };

  const getTabBarVisibilityForAccountStack = (route) => {
    console.log(route, "---------", "route");
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName, "---------", "focused route");

    if (routeName === undefined || routeName === SCREEN_NAMES.Account) {
      return true;
    }

    return false;
  };

  const [role, setRole] = useSelector((state) => state.user.userRole);

  console.log(role, "role");

  return (
    <Tab.Navigator
      options={{
        showLabel: false,
        style: {
          // borderTopRightRadius: 25,
          // borderTopLeftRadius: 25,
          // height: 80,
          backgroundColor: "white",
          // elevation: 0,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === MAIN_STACKS.HomeStack) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === MAIN_STACKS.ChatStack) {
            iconName = focused ? "md-chatbox" : "md-chatbox-outline";
          } else if (route.name === MAIN_STACKS.AccountStack) {
            iconName = focused ? "md-reader" : "md-reader-outline";
          }

          // You can return any component that you like here!
          return (
            <IconName
              name={iconName}
              size={30}
              color={color}
            // style={{ marginTop: -20 }}
            />
          );
        },
      })}
    >
      {role === "p" ? (
        <Tab.Screen
          component={HomeForPatientStackNavigator}
          name={MAIN_STACKS.HomeStack}
          options={({ route }) => ({
            tabBarLabel: () => { return null },
            tabBarVisible: getTabBarVisibilityForHomeStack(route),
            headerShown: false
          })}
        />
      ) : (
        <Tab.Screen
          component={HomeForDoctorStackNavigator}
          name={MAIN_STACKS.HomeStack}
          options={({ route }) => ({
            tabBarLabel: () => { return null },
            tabBarVisible: getTabBarVisibilityForHomeStack(route),
            headerShown: false
          })}
        />
      )}

      <Tab.Screen
        component={ChatStackNavigator}
        name={MAIN_STACKS.ChatStack}
        options={({ route }) => ({
          tabBarLabel: () => { return null },
          tabBarVisible: getTabBarVisibilityForChatStack(route),
          headerShown: false
        })}
      />

      {role === "p" ? (
        <Tab.Screen
          component={PatientAccountStackNavigator}
          name={MAIN_STACKS.AccountStack}
          options={({ route }) => ({
            tabBarLabel: () => { return null },
            tabBarVisible: getTabBarVisibilityForAccountStack(route),
            headerShown: false
          })}
        />
      ) : (
        <Tab.Screen
          component={DoctorAccountStackNavigator}
          name={MAIN_STACKS.AccountStack}
          options={({ route }) => ({
            tabBarLabel: () => { return null },
            tabBarVisible: getTabBarVisibilityForAccountStack(route),
            headerShown: false,
          })}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
