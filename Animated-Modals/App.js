import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import ModalTester from "./components/ModalTester";
import ScrollAndSwipeable from "./components/ScrollAndSwipeable";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <ModalTester /> */}
      <ScrollAndSwipeable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
