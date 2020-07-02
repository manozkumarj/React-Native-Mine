import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const PostsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Posts screen!</Text>
      <Button
        title="Profile"
        onPress={() => props.navigation.navigate("profile")}
      />
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
  logout: {
    paddingHorizontal: 10,
  },
});

export default PostsScreen;
