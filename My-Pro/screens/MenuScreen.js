import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-tiny-toast";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
const defaultAvatar = require("./../assets/images/avatar.png");
import { useDispatch, useSelector } from "react-redux";

import { removeToken } from "./../redux/actionCreators";

const MenuScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  let loggedInUserUsername;
  loggedInUserUsername = useSelector(
    (state) => state.centralState.loggedInUserDetails.username
  );

  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("User will be logged Out");
    const toast = Toast.showLoading("Logging out, Please wait...");
    try {
      await dispatch(removeToken());
      Toast.hide(toast);
      console.log("User will logged Out, see you again...");
    } catch (err) {
      console.log("Something went wrong while logging out");
      console.log(err);
      Toast.hide(toast);
    }
  };
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
          onPress={() =>
            navigation.push("Profile", { username: loggedInUserUsername })
          }
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.push("Friends", { username: loggedInUserUsername })
          }
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Friends List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.push("FriendRequests", {
              username: loggedInUserUsername,
            })
          }
          style={styles.optionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.option}>Friend Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.push("SentRequests", { username: loggedInUserUsername })
          }
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
          onPress={handleLogout}
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
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 17,
  },
});

export default MenuScreen;
