import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FindAccountScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Find Account screen!</Text>
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

export default FindAccountScreen;
