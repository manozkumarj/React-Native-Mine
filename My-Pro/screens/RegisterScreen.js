import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Colors from "./../constants/Colors";
import Input from "./../components/UI/Input";
import Card from "./../components/UI/Card";

import { registerAccount } from "./../redux/actionCreators";

const RegisterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [disableButtons, setDisableButtons] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    action = registerAccount({ fullName, email, password });
    setError(null);
    setIsLoading(true);
    try {
      console.log(action);
      // await dispatch(action);
      // props.navigation.navigate("LoggedIn");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="fullName"
              label="fullName"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid full name."
              initialValue=""
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
            />
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              initialValue=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              initialValue=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.siteColor} />
              ) : (
                <Button
                  title="Register"
                  color={Colors.siteColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button title={`Switch to Login`} color={Colors.siteColor} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

RegisterScreen.navigationOptions = {
  headerTitle: "Register",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default RegisterScreen;
