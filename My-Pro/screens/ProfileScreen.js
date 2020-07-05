import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
import { useSelector } from "react-redux";
const defaultAvatar = require("./../assets/images/avatar.png");
const defaultCoverPic = require("./../assets/images/coverPic.jpeg");
import { getProfileUserDetailsAndPosts } from "./../redux/actionCreators";

const ProfileScreen = (props) => {
  const { username } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);
  let getLoggedInUserDetails = useSelector(
    (state) => state.centralState.loggedInUserDetails
  );

  let getProfilePageUserDetails = useSelector(
    (state) => state.centralState.profilePageUserDetails
  );

  let getLoggedInUserUsername = useSelector(
    (state) => state.centralState.loggedInUserDetails.username
  );

  let getStatus = getLoggedInUserUsername === username ? true : false;

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(
    getLoggedInUserDetails
  );
  const [profilePageUserDetails, setProfilePageUserDetails] = useState(
    getProfilePageUserDetails
  );
  const [
    isSessionAndProfileUserSame,
    setIsSessionAndProfileUserSame,
  ] = useState(getStatus);
  const imagesUrl = "http://192.168.43.22:8088/photo/";

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let receivedResponse = await dispatch(
        getProfileUserDetailsAndPosts(username)
      );
      console.log("Response received...");
      // console.log(receivedResponse);
      setProfilePageUserDetails(receivedResponse.details.userProfileDetails);
      setLoggedInUserDetails(receivedResponse.details.authUserdetails);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Dispatch action returned an error");
      console.log(err);
      // setError(err.message);
    }
  };

  const primaryDpUrl = profilePageUserDetails
    ? profilePageUserDetails.primaryDp
    : null;
  const secondaryDpUrl = profilePageUserDetails
    ? profilePageUserDetails.secondaryDp
    : null;
  let primaryDpImage = null;
  let secondaryDpImage = null;

  if (primaryDpUrl) {
    primaryDpImage = (
      <Image
        style={styles.postUserPrimaryDp}
        source={{
          uri: imagesUrl + primaryDpUrl,
        }}
      />
    );
  } else {
    primaryDpImage = (
      <Image style={styles.postUserPrimaryDp} source={defaultAvatar} />
    );
  }

  if (secondaryDpUrl) {
    secondaryDpImage = (
      <Image
        style={styles.postUserSecondaryDp}
        source={{
          uri: imagesUrl + secondaryDpUrl,
        }}
      />
    );
  } else {
    secondaryDpImage = (
      <Image style={styles.postUserSecondaryDp} source={defaultAvatar} />
    );
  }

  let coverPhoto = profilePageUserDetails
    ? profilePageUserDetails.profileCoverPhoto
    : defaultCoverPic;

  useEffect(() => {
    Image.getSize(imagesUrl + coverPhoto, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    });
  }, [profilePageUserDetails]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLoading && profilePageUserDetails) {
    return (
      <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
        <View style={styles.customHeader}>
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerOptionText}>
            {profilePageUserDetails.fullName}
          </Text>
        </View>
        <ScrollView>
          <View>
            <Image
              source={{ uri: imagesUrl + coverPhoto }}
              style={{ width: imgWidth, height: imgHeight }}
            />
          </View>
          <View style={styles.dpsContainer}>
            {primaryDpImage}
            {secondaryDpImage}
          </View>
          <View style={styles.userDetailsContainer}>
            <Text>
              This is Profile screen! {profilePageUserDetails.primaryDp}
            </Text>
            <Text>{profilePageUserDetails.primaryDp}</Text>
            <Text>{profilePageUserDetails.secondaryDp}</Text>
            <Text>{profilePageUserDetails.profileCoverPhoto}</Text>
            <Text>{username}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
  dpsContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postUserPrimaryDp: {
    position: "absolute",
    top: -80,
    left: 10,
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  postUserSecondaryDp: {
    position: "absolute",
    top: -80,
    right: 10,
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  userDetailsContainer: {
    marginVertical: 30,
  },
});

export default ProfileScreen;
