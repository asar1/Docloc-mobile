import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ForumStackNavigator, SignInStackNavigator, SplashStackNavigator, TutorialStackNavigator } from "./stack";
import { DrawerContent } from "./drawerContent";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tab";
import { MAIN_STACKS } from "../helper/Constant";

const Root = createStackNavigator();
const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name={MAIN_STACKS.SplashStack} component={SplashStackNavigator} />
        <Root.Screen name={MAIN_STACKS.TutorialStack} component={TutorialStackNavigator} />
        <Root.Screen name={MAIN_STACKS.SignInStack} component={SignInStackNavigator} />
        <Root.Screen name={MAIN_STACKS.DrawerStack} component={DrawerNavigator} />
        <Root.Screen name={MAIN_STACKS.ForumStack} component={ForumStackNavigator} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={MAIN_STACKS.TabStack} component={TabNavigator} />
      <Drawer.Screen name={MAIN_STACKS.ForumStack} component={ForumStackNavigator} />
    </Drawer.Navigator>
  );
};
