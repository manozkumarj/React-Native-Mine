import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import LongPressDetection from "./components/LongPressDetection";
// import HorizontalFlatListScroll from "./components/HorizontalFlatListScroll";
// import WallpaperApp from "./components/WallpaperApp";
import BackButtonHandler from "./components/BackButtonHandler";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
    // <LongPressDetection />
    // <HorizontalFlatListScroll />
    // <WallpaperApp />
    <BackButtonHandler />
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
