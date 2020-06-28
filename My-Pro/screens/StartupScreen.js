import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";

import Colors from "../constants/Colors";

const StartupScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      console.log("authToken from StartUpScreen -->" + authToken);
      if (!authToken) {
        props.navigation.navigate("Auth");
        // props.navigation.navigate("LoggedIn");
      } else {
        props.navigation.navigate("LoggedIn");
      }
    };

    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
