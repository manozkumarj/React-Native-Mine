// import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Colors from "../constants/Colors";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.siteColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen",
};

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

export default createAppContainer(LoggedInNavigator);
