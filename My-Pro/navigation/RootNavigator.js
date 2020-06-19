// import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Colors from "../constants/Colors";

import PostsScreen from "./../screens/PostsScreen";
import ProfileScreen from "./../screens/ProfileScreen";

import RegisterScreen from "./../screens/RegisterScreen";
import LoginScreen from "./../screens/LoginScreen";
import StartupScreen from "./../screens/StartupScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.siteColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

const AuthNavigator = createStackNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const LoggedInNavigator = createStackNavigator(
  {
    posts: {
      screen: PostsScreen,
    },
    profile: {
      screen: ProfileScreen,
    },
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  LoggedIn: LoggedInNavigator,
});

export default createAppContainer(MainNavigator);
