import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const PostsScreen = (props) => {
  const submitHandler = () => {
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    props.navigation.setParams({ logout: submitHandler });
  }, [submitHandler]);

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
      <HeaderButtons>
        <Item title="Logout" onPress={logoutFn} />
      </HeaderButtons>
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
});

export default PostsScreen;
