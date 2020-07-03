import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";

import Constant from "expo-constants";
import ProfileScreen from "./../screens/ProfileScreen";
import PostsScreen from "./../screens/PostsScreen";
import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReactionsScreen from "./../screens/ReactionsScreen";
import CommentsScreen from "./../screens/CommentsScreen";
import { useSelector } from "react-redux";

let authToken;

const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function LoggedInStackScreen() {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen name="Posts" component={PostsScreen} />
      <LoggedInStack.Screen name="Profile" component={ProfileScreen} />
      <LoggedInStack.Screen name="Reactions" component={ReactionsScreen} />
      <LoggedInStack.Screen name="Comments" component={CommentsScreen} />
    </LoggedInStack.Navigator>
  );
}

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  authToken = useSelector((state) => state.centralState.authToken);
  console.log("authToken from Let variable -->" + authToken);
  useEffect(() => {
    // const tryLogin = async () => {
    //   authToken = await AsyncStorage.getItem("authToken");
    //   console.log("authToken from StartUpScreen -->" + authToken);
    //   setIsLoading(false);
    // };

    // tryLogin();

    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        authToken = await AsyncStorage.getItem("authToken");
        console.log("authToken from RootNavigator -->" + authToken);
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
      <NavigationContainer>
        <AuthStack.Navigator headerMode="none">
          <AuthStack.Screen name="auth" component={AuthStackScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
  if (authToken) {
    return (
      <NavigationContainer>
        <LoggedInStack.Navigator headerMode="none">
          <LoggedInStack.Screen
            name="LoggedIn"
            component={LoggedInStackScreen}
          />
        </LoggedInStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootNavigator;
