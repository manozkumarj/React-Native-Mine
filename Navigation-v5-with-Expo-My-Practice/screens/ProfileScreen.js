import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import InnerComponent from "./InnerComponent";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Profile screen!</Text>
      <Button
        title="Posts"
        onPress={() => props.navigation.navigate("posts")}
      />
      <Button
        title="Auth"
        onPress={() => props.navigation.navigate("auth")}
      />
      <InnerComponent />
      {/* <Button
        onPress={() => props.navigation.navigate("MyModal")}
        title="Open Modal"
      /> */}
    </View>
  );
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

export default ProfileScreen;
