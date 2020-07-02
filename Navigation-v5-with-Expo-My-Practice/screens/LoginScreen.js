import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Login screen!</Text>
      <Button
        title="Register"
        onPress={() => props.navigation.navigate("register")}
      />
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: "Login",
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

export default LoginScreen;
