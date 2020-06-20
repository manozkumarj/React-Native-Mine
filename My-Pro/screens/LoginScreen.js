import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import tinyLoader from "./../assets/icons/tiny-loader.gif";

// import { useDispatch } from "react-redux";
import Colors from "./../constants/Colors";
// import { loginUser } from "./../redux/actionCreators";
import Card from "./../components/UI/Card";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log(props);
  //   setDisableButtons(false);
  //   setShowLoader(false);
  // }, [props]);

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
              <Button title="Login" color={Colors.siteColor} />
            )}
          </View>
          <View style={styles.dividableHr} />
          <View style={styles.buttonContainer}>
            <Button title="Register" color={Colors.siteColor} />
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
    // justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    width: "85%",
    padding: 20,
    marginVertical: 5,
    // maxWidth: 400,
    maxHeight: 310,
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
