import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FriendsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Friends screen!</Text>
    </View>
  );
};

FriendsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Friends",
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

export default FriendsScreen;
