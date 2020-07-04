import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuScreen = (props) => {
  useEffect(() => {
    props.navigation.setParams({ logout: logOutHandler });
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is Menu screen!</Text>
      <Button
        title="Profile"
        onPress={() => props.navigation.push("Profile")}
      />
    </View>
  );
};

MenuScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Menu",
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

export default MenuScreen;
