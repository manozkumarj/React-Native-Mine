import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostsScreen = (props) => {
  const logOutHandler = () => {
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    props.navigation.setParams({ logout: logOutHandler });
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is Posts screen!</Text>
      <Button
        title="Profile"
        onPress={() => props.navigation.navigate("Profile")}
      />
    </View>
  );
};

PostsScreen.navigationOptions = (navData) => {
  const logoutFn = navData.navigation.getParam("logout");
  return {
    headerTitle: "Posts",
    headerRight: () => (
      <Ionicons
        name="md-log-out"
        size={25}
        color="#fff"
        title="Logout"
        onPress={logoutFn}
        style={styles.logout}
      />
    ),
  };
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
