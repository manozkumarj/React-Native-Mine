// import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Colors from "../constants/Colors";

import PostsScreen from "./../screens/PostsScreen";
import ProfileScreen from "./../screens/ProfileScreen";

import RegisterScreen from "./../screens/RegisterScreen";
import LoginScreen from "./../screens/LoginScreen";
import StartupScreen from "./../screens/StartupScreen";
import ForgottenPasswordScreen from "./../screens/ForgottenPasswordScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.siteColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  // headerTitle: "A Screen",
};

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: {
      screen: RegisterScreen,
      headerTitle: "Register",
    },
    ForgottenPassword: {
      screen: ForgottenPasswordScreen,
      headerTitle: "Forgotten Account",
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const LoggedInNavigator = createStackNavigator(
  {
    Posts: {
      screen: PostsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: "Posts",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  LoggedIn: LoggedInNavigator,
});

export default createAppContainer(MainNavigator);
