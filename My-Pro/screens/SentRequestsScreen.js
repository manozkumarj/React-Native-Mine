import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SentRequestsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is SentRequests screen!</Text>
    </View>
  );
};

SentRequestsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "SentRequests",
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

export default SentRequestsScreen;
