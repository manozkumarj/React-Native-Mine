import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
const defaultAvatar = require("./../assets/images/avatar.png");

const MenuScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View style={styles.customHeader}>
        <Ionicons
          name="md-arrow-round-back"
          size={25}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerOptionText}>Options</Text>
      </View>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.push("Profile")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Friends")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Friends List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("FriendRequests")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Friend Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("SentRequests")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Sent Friend Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Settings")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Will be logged Out")}
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // elevation: 4,
    paddingHorizontal: 15,
    backgroundColor: Colors.siteColor,
    // zIndex: -1,
  },
  headerOptionText: {
    color: "#fff",
    fontSize: 18,
  },
  optionContainer: {
    backgroundColor: "#ccc",
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 17,
  },
});

export default MenuScreen;
