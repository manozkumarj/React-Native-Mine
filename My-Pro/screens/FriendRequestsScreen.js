import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendRequestsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is FriendRequests screen!</Text>
    </View>
  );
};

FriendRequestsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "FriendRequests",
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

export default FriendRequestsScreen;
