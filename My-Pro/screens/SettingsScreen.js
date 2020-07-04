import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Settings screen!</Text>
    </View>
  );
};

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Settings",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
