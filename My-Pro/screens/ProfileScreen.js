import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
import { useSelector } from "react-redux";
const defaultAvatar = require("./../assets/images/avatar.png");

HEADER_MAX_HEIGHT = 180;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 200;
PROFILE_IMAGE_MIN_HEIGHT = 200;

const ProfileScreen = (props) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  const navigation = useNavigation();
  let scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: "clamp",
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
    outputRange: [0, 0, 1000],
    extrapolate: "clamp",
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 50,
    ],
    outputRange: [-20, -20, -20, -18],
    extrapolate: "clamp",
  });
  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT,
    ],
    extrapolate: "clamp",
  });

  let loggedInUserDetails;
  loggedInUserDetails = useSelector(
    (state) => state.centralState.loggedInUserDetails
  );

  const primaryDpUrl = loggedInUserDetails.primaryDp;
  const secondaryDpUrl = loggedInUserDetails.secondaryDp;
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

  let coverPhoto = loggedInUserDetails.profileCoverPhoto;

  useEffect(() => {
    Image.getSize(imagesUrl + coverPhoto, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    });
  }, [loggedInUserDetails]);

  Image.getSize(imagesUrl + coverPhoto, (width, height) => {
    // calculate image width and height
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;
    setImgWidth(screenWidth);
    setImgHeight(imageHeight);
  });

  if (!loggedInUserDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (loggedInUserDetails) {
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
            {loggedInUserDetails.fullName}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "lightskyblue",
              height: headerHeight,
              zIndex: headerZindex,
              elevation: headerZindex, //required for android
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                position: "absolute",
                bottom: headerTitleBottom,
                backgroundColor: "yellow",
                // marginTop: 500,
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Varun Nath
              </Text>
            </Animated.View>
          </Animated.View>

          <ScrollView
            style={{ flex: 1 }}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollY } } },
            ])}
          >
            <Animated.View
              style={{
                height: profileImageHeight,
                width: "100%",
                borderColor: "white",
                // overflow: "hidden",
              }}
            >
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
            </Animated.View>
            <View style={{ marginTop: 5 }}>
              <View style={styles.userDetailsContainer}>
                <Text>
                  This is Profile screen! {loggedInUserDetails.primaryDp}
                </Text>
                <Text>{loggedInUserDetails.primaryDp}</Text>
                <Text>{loggedInUserDetails.secondaryDp}</Text>
                <Text>{loggedInUserDetails.profileCoverPhoto}</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
              </View>
            </View>

            <View style={{ height: 1000 }} />
          </ScrollView>
        </View>
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
