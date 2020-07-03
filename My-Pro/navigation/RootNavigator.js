import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

import Constant from "expo-constants";
import ProfileScreen from "./../screens/ProfileScreen";
import PostsScreen from "./../screens/PostsScreen";
import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

let authToken = false;

const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="login" component={LoginScreen} />
      <AuthStack.Screen name="register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function LoggedInStackScreen() {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen name="profile" component={ProfileScreen} />
      <LoggedInStack.Screen name="posts" component={PostsScreen} />
    </LoggedInStack.Navigator>
  );
}

function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryLogin = async () => {
      authToken = await AsyncStorage.getItem("authToken");
      console.log("authToken from StartUpScreen -->" + authToken);
      setIsLoading(false);
    };

    tryLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authToken) {
    return (
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen name="auth" component={AuthStackScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
  if (authToken) {
    return (
      <NavigationContainer>
        <LoggedInStack.Navigator>
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
