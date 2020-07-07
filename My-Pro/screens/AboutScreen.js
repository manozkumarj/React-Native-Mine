import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUserDetailsAndPosts } from "./../redux/actionCreators";

import { Modalize } from "react-native-modalize";
const defaultAvatar = require("./../assets/images/avatar.png");

const AboutScreen = (props) => {
  const { username } = props.route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [friendsArray, setFriendsArray] = useState([]);
  let getProfilePageUserDetails = useSelector(
    (state) => state.centralState.profilePageUserDetails
  );
  const [profilePageUserDetails, setProfilePageUserDetails] = useState(
    getProfilePageUserDetails
  );

  let getLoggedInUserUsername = useSelector(
    (state) => state.centralState.loggedInUserDetails.username
  );

  let getStatus = getLoggedInUserUsername === username ? "true" : "false";

  const [
    isSessionAndProfileUserSame,
    setIsSessionAndProfileUserSame,
  ] = useState(getStatus);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  let output = null;

  useEffect(() => {
    fetchData();
  }, []);

  const showTinyModal = (postId) => {
    modalizeRef.current.open();
  };

  const deleteFriend = () => {
    console.log("Need to delete this friend");
    modalizeRef.current.close();
  };

  const onRefresh = () => {
    // sendPushNotification();
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let receivedResponse = await dispatch(
        getProfileUserDetailsAndPosts(username)
      );
      console.log("Response received...");
      // console.log(receivedResponse);
      setProfilePageUserDetails(receivedResponse.details.userProfileDetails);
      let getFriendsArray = receivedResponse.details.userProfileDetails.friends;
      let getFriends = getFriendsArray.filter(
        (friend) => friend.status === "pending"
      );
      setFriendsArray(getFriends);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Dispatch action returned an error");
      console.log(err);
      // setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  let loopId = 1;

  const renderContent = () => (
    <View style={styles.modalContainer}>
      {/* <Text style={{  backgroundColor: "#ddd" }}></Text> */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={deleteFriend}
          style={styles.deleteOptionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.deleteOption}>Delete this friend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => modalizeRef.current.close()}
          style={styles.closeOptionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.closeOption}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View style={styles.customHeader}>
        <Ionicons
          name="md-arrow-round-back"
          size={25}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerOptionText}>About</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : profilePageUserDetails === null ? (
        <View
          style={styles.loadingContainer}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
              tintColor="red"
              colors={["red", "green", "blue"]}
              title="Refreshing..."
            />
          }
        >
          <Text style={styles.nofriends}>Nothing to show</Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
              tintColor="red"
              colors={["red", "green", "blue"]}
              title="Refreshing..."
            />
          }
        >
          <View style={styles.aboutMainContainer}>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Full name</Text>
              <Text style={styles.info}>{profilePageUserDetails.fullName}</Text>
            </View>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.info}>
                {profilePageUserDetails.genderId
                  ? profilePageUserDetails.genderId
                  : "--N/A--"}
              </Text>
            </View>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.info}>{profilePageUserDetails.email}</Text>
            </View>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Password</Text>
              <Text style={styles.info}>{profilePageUserDetails.password}</Text>
            </View>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.info}>
                {profilePageUserDetails.phoneNumber
                  ? profilePageUserDetails.phoneNumber
                  : "--N/A--"}
              </Text>
            </View>
            <View style={styles.singleSection}>
              <Text style={styles.label}>Joined on</Text>
              <Text style={styles.info}>
                {profilePageUserDetails.milliseconds}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      <Modalize ref={modalizeRef} adjustToContentHeight={toggle}>
        {renderContent()}
      </Modalize>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  aboutMainContainer: {
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  singleSection: {
    flexDirection: "column",
    paddingVertical: 8,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  label: {
    color: "#999",
    fontSize: 15,
  },
  info: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AboutScreen;
