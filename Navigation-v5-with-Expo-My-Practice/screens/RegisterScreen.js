import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const RegisterScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Register screen!</Text>
      <Button
        title="Login"
        onPress={() => props.navigation.navigate("login")}
      />
    </View>
  );
};

RegisterScreen.navigationOptions = {
  headerTitle: "Register",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
