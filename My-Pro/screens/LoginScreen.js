import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import tinyLoader from "./../assets/icons/tiny-loader.gif";

// import { useDispatch } from "react-redux";
import Colors from "./../constants/Colors";
// import { loginUser } from "./../redux/actionCreators";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    console.log(props);
    setDisableButtons(false);
    setShowLoader(false);
  }, [props]);

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
    <View style={styles.container}>
      <View style={styles.threeDivsContainer}>
        <View style={styles.loginMainContainer}>
          <Text style={styles.loginTitle}>Log In to Existing Account</Text>

          <View style={styles.dividableHr} />

          <View style={styles.loginFormHolder}>
            <View style={styles.loginFormFieldHolder}>
              <TextInput
                style={styles.loginFormField}
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </View>
            <View style={styles.loginFormFieldHolder}>
              <TextInput
                style={styles.loginFormField}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </View>
            <View style={styles.loginFormFieldHolder}>
              <Button
                style={styles.btnClasses}
                disabled={disableButtons}
                onPress={handleSubmit}
                title="Log In"
              >
                <Image
                  style={{ display: showLoader ? "inline" : "none" }}
                  src={tinyLoader}
                  alt="Loader"
                  style={styles.tinyLoader}
                />
              </Button>
            </View>
            <View style={styles.dividableHr} />
            <View style={styles.loginContainer}>
              <Button
                onPress={() => handleBtnClick("find-account")}
                style={styles.btnClasses}
                disabled={disableButtons}
                title="Forgotten Account?"
              ></Button>
            </View>
          </View>
          <View style={styles.width75}>
            <View style={styles.dividableHr} />
          </View>
          <View style={styles.loginFormHolder}>
            <Button
              onPress={() => handleBtnClick("register")}
              style={styles.btnClasses}
              disabled={disableButtons}
              title="Register an Account"
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginMainContainer: {
    width: "50%",
    margin: "5% auto",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 3,
    borderColor: "#cccccc",
    borderWidth: 2,
    padding: "30px 15px",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.siteColor,
  },
  loginFormHolder: {
    width: "60%",
    margin: "auto",
  },
  loginFormFieldHolder: {
    margin: "auto",
  },
  loginFormField: {
    width: "93%",
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    fontSize: 16,
  },
  loginFormBtn: {
    width: "99%",
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginVertical: 5,
    backgroundColor: Colors.siteColor,
    color: "#fff",
    borderRadius: 5,
    fontSize: 16,
    borderColor: "transparent",
  },
  width75: {
    width: "75%",
    margin: "auto",
  },
  loginContainer: {
    margin: "auto",
    textAlign: "center",
  },
  loginContainer: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
