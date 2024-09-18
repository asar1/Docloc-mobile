/* eslint-disable no-dupe-class-members */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import { View, ActivityIndicator, BackHandler, StatusBar } from "react-native";
import store from "./App/redux/store";
import { RootNavigator } from "./App/navigation/rootNavigator";
import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { BACKGROUND } from "./App/helper/Color";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ isReady: true });
  }

  render() {
    return this.state.isReady ? (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MyStatusBar
            backgroundColor={BACKGROUND.primary}
            barStyle="light-content"
          />
          <RootNavigator />
        </View>
      </Provider>
    ) : (
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"#000000"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
