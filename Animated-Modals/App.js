import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import ModalTester from "./components/ModalTester";
// import ScrollAndSwipeable from "./components/ScrollAndSwipeable";
// import Dummy from "./components/Dummy";
// import FbStyleModal from "./components/FbStyleModal";
import ContentHeightModal from "./components/ContentHeightModal";
// import ReactionsShowableModal from "./components/ReactionsShowableModal";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <ModalTester /> */}
      {/* <ScrollAndSwipeable /> */}
      {/* <Dummy /> */}
      {/* <FbStyleModal /> */}
      {/* <ReactionsShowableModal /> */}
      <ContentHeightModal />
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
