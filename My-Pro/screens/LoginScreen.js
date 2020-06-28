import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "./../constants/Colors";
import Card from "./../components/UI/Card";

import { loginUser } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("manoj@gmail.com");
  const [password, setPassword] = useState("manoj123");
  const [disableButtons, setDisableButtons] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async () => {
    setDisableButtons(true);
    setIsLoading(true);
    setError(null);
    if (email.trim()) {
      let formFields = { email, password };
      try {
        await dispatch(loginUser(formFields));
        setDisableButtons(false);
        setIsLoading(false);
        console.log("Login successful...");
        registerForPushNotificationsAsync();
      } catch (err) {
        setDisableButtons(false);
        setIsLoading(false);
        console.log("Dispatch action returned an error");
        console.log(err);
        setError(err.message);
      }
    } else {
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      console.log("Permission denies");
      return;
    }

    // Get the token that uniquely identifies this device
    let getToken = await Notifications.getExpoPushTokenAsync();
    // getToken = getToken + "manoz";
    const storeToken = await AsyncStorage.setItem("notifyToken", getToken);
    if (getToken) {
      console.log("Notify token stored");
      props.navigation.navigate("LoggedIn");
    } else {
      console.log("Notify token not stored");
      alert("Notify token not stored");
      props.navigation.navigate("LoggedIn");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wholeBg}>
      <LinearGradient
        colors={["transparent", "transparent"]}
        style={styles.gradient}
      >
        <Card style={styles.loginContainer}>
          <Text style={styles.pageTitle}>Log In to Existing Account</Text>
          <View style={styles.dividableHr} />
          <TextInput
            placeholder="Enter Email"
            email
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholderTextColor="#9a73ef"
          />
          <TextInput
            placeholder="Enter Password"
            password={true}
            value={password}
            secureTextEntry
            placeholderTextColor="#9a73ef"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={{ color: "white" }} />
            ) : (
              <Button
                title="Login"
                color={Colors.siteColor}
                onPress={authHandler}
                disabled={disableButtons}
              />
            )}
          </View>
          <View style={styles.dividableHr} />
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              color={Colors.siteColor}
              onPress={() => props.navigation.navigate("Register")}
              disabled={disableButtons}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Forgotten password?"
              color={Colors.siteColor}
              onPress={() => props.navigation.navigate("ForgottenPassword")}
              disabled={disableButtons}
            />
          </View>
        </Card>
      </LinearGradient>
    </ScrollView>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: "Login",
};

const styles = StyleSheet.create({
  wholeBg: {
    // backgroundColor: Colors.bgColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    width: "85%",
    padding: 20,
    marginVertical: 5,
    maxHeight: 320,
  },
  dividableHr: {
    borderWidth: 1,
    borderColor: Colors.siteColor,
    marginVertical: 10,
  },
  input: {
    borderColor: Colors.siteColor,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginVertical: 5,
    fontSize: 17,
  },
  buttonContainer: {
    marginVertical: 5,
  },
});

export default LoginScreen;
