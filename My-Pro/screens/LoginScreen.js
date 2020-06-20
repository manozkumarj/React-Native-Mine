import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
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
          <Text>Log In to Existing Account</Text>
          <View style={styles.dividableHr} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    width: "80%",
    padding: 20,
    marginVertical: 5,
    // maxWidth: 400,
    maxHeight: 400,
  },
  dividableHr: {
    borderWidth: 1,
    borderColor: Colors.siteColor,
  },
});

export default LoginScreen;
