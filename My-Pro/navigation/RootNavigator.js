import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

import Constant from "expo-constants";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import ForgottenPasswordScreen from "./../screens/ForgottenPasswordScreen";

import ProfileScreen from "./../screens/ProfileScreen";
import PostsScreen from "./../screens/PostsScreen";
import ReactionsScreen from "./../screens/ReactionsScreen";
import CommentsScreen from "./../screens/CommentsScreen";
import SettingsScreen from "./../screens/SettingsScreen";
import FriendsScreen from "./../screens/FriendsScreen";
import FriendRequestsScreen from "./../screens/FriendRequestsScreen";
import SentRequestsScreen from "./../screens/SentRequestsScreen";
import MenuScreen from "./../screens/MenuScreen";

let authToken;

const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  authToken = useSelector((state) => state.centralState.authToken);
  // console.log("authToken from Let variable -->" + authToken);

  useEffect(() => {
    setTimeout(async () => {
      try {
        authToken = await AsyncStorage.getItem("authToken");
        // console.log("authToken from RootNavigator -->" + authToken);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: Constant.statusBarHeight,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authToken) {
    return (
      <NavigationContainer headerMode="none">
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
          <AuthStack.Screen
            name="ForgottenPassword"
            component={ForgottenPasswordScreen}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  } else if (authToken) {
    return (
      <NavigationContainer headerMode="none">
        <LoggedInStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <LoggedInStack.Screen name="Posts" component={PostsScreen} />
          <LoggedInStack.Screen name="Profile" component={ProfileScreen} />
          <LoggedInStack.Screen name="Menu" component={MenuScreen} />
          <LoggedInStack.Screen name="Reactions" component={ReactionsScreen} />
          <LoggedInStack.Screen name="Comments" component={CommentsScreen} />
          <LoggedInStack.Screen name="Settings" component={SettingsScreen} />
          <LoggedInStack.Screen name="Friends" component={FriendsScreen} />
          <LoggedInStack.Screen
            name="FriendRequests"
            component={FriendRequestsScreen}
          />
          <LoggedInStack.Screen
            name="SentRequests"
            component={SentRequestsScreen}
          />
        </LoggedInStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootNavigator;
