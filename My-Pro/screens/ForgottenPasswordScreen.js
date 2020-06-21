import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "./../constants/Colors";
import Card from "./../components/UI/Card";

const ForgottenPasswordScreen = (props) => {
  const [email, setEmail] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    if (email.trim()) {
      console.log("Form submitted");
      let loginDetails = {
        email,
        password,
      };
      console.log(loginDetails);
      // props.loginUser(loginDetails);
    } else {
      setDisableButtons(false);
      setShowLoader(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wholeBg}>
      <LinearGradient
        colors={["transparent", "transparent"]}
        style={styles.gradient}
      >
        <Card style={styles.loginContainer}>
          <Text style={styles.pageTitle}>Forgotten Account</Text>
          <View style={styles.dividableHr} />
          <TextInput
            placeholder="Enter Email"
            email
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholderTextColor="#9a73ef"
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={{ color: "white" }} />
            ) : (
              <Button title="Continue" color={Colors.siteColor} />
            )}
          </View>
          <View style={styles.dividableHr} />
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              color={Colors.siteColor}
              onPress={() => props.navigation.navigate("Login")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              color={Colors.siteColor}
              onPress={() => props.navigation.navigate("Register")}
            />
          </View>
        </Card>
      </LinearGradient>
    </ScrollView>
  );
};

ForgottenPasswordScreen.navigationOptions = {
  headerTitle: "Forgotten Account",
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

export default ForgottenPasswordScreen;
