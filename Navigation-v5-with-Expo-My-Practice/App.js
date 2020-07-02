import React from "react";
import { View, Text, Button, ScrollView, Dimensions } from "react-native";

import Constant from "expo-constants";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostsScreen from "./screens/PostsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const isLoggedIn = true;

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ marginTop: Constant.statusBarHeight }}>
      <Text>Showing Modals</Text>
      <ScrollView>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Text>
          Setting the headerMode prop to screen makes the header part of the
          screen, so you don't have to implement animations to animate it
          separately. If you want to customize how the header animates and want
          to keep headerMode as float, you can interpolate on the
          scene.progress.current and scene.progress.next props. For example,
          following will cross-fade the header:
        </Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </ScrollView>
    </View>
  );
}

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
      <LoggedInStack.Screen name="home" component={HomeScreen} />
      <LoggedInStack.Screen name="posts" component={PostsScreen} />
      <LoggedInStack.Screen
        mode="modal"
        name="MyModal"
        component={ModalScreen}
        options={{ headerShown: false }}
      />
    </LoggedInStack.Navigator>
  );
}

function App() {
  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <LoggedInStack.Navigator headerMode="none">
          <LoggedInStack.Screen name="auth" component={AuthStackScreen} />
        </LoggedInStack.Navigator>
      </NavigationContainer>
    );
  }
  if (isLoggedIn) {
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

export default App;
