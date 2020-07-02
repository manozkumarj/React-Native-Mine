import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "./../constants/Colors";

const ReactionsScreen = (props) => {
  const postId = props.navigation.getParam("postId");
  const reactionsArray = props.navigation.getParam("reactionsArray");
  return <Text>This is Reactions screen</Text>;
};

// const styles = StyleSheet.create({
//     style
// });

export default ReactionsScreen;
