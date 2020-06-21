import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is Profile screen!</Text>
      <Button
        title="Profile"
        onPress={() => props.navigation.navigate("Posts")}
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
});

export default ProfileScreen;
