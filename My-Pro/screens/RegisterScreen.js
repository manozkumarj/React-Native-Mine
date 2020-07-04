import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import Colors from "./../constants/Colors";
import { registerAccount } from "./../redux/actionCreators";
import Card from "./../components/UI/Card";

const RegisterScreen = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const registerHandler = async () => {
    setDisableButtons(true);
    setIsLoading(true);
    setError(null);
    if (email.trim() && fullName.trim()) {
      let formFields = { fullName, email, password };
      try {
        await dispatch(registerAccount(formFields));
        setDisableButtons(false);
        setIsLoading(false);
        console.log("Registration successful...");
        props.navigation.navigate("Login");
      } catch (err) {
        setDisableButtons(false);
        setIsLoading(false);
        console.error("Dispatch action returned an error");
        console.error(err);
        setError(err.message);
      }
    } else {
      setDisableButtons(false);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wholeBg}>
      <LinearGradient
        colors={["transparent", "transparent"]}
        style={styles.gradient}
      >
        <Card style={styles.loginContainer}>
          <Text style={styles.pageTitle}>Register an Account</Text>
          <View style={styles.dividableHr} />
          <TextInput
            placeholder="Enter Full name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.input}
            placeholderTextColor="#9a73ef"
          />
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
                title="Register"
                color={Colors.siteColor}
                onPress={registerHandler}
                disabled={disableButtons}
              />
            )}
          </View>
          <View style={styles.dividableHr} />
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              color={Colors.siteColor}
              onPress={() => props.navigation.navigate("Login")}
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

// RegisterScreen.navigationOptions = {
//   headerTitle: "Register",
// };

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

export default RegisterScreen;
