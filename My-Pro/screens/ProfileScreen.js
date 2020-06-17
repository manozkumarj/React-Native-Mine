import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Profile screen!</Text>
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
});

export default ProfileScreen;
