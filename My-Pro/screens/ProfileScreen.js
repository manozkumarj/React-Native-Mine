import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  FlatList,
  RefreshControl,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { useNavigation } from "@react-navigation/native";

import { getIndividualUserPosts } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";

import DefaultAndCustomBgAndTextColorPost from "./../components/UI/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../components/UI/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../components/UI/CustomBgAndTextAndCornerPost";
import PostReactions from "./../components/UI/PostReactions";
import PhotosPost from "./../components/UI/PhotosPost";

const loveHeartsEyesEmoji = require("./../assets/emojis/love-hearts-eyes-emoji-50.png");
const likeThumbEmoji = require("./../assets/emojis/like-thumb-emoji-50.png");
const dislikeThumbEmoji = require("./../assets/emojis/dislike-thumb-emoji-50.png");
const laugherEmoji = require("./../assets/emojis/face-with-tears-of-joy-emoji-50.png");
const angryEmoji = require("./../assets/emojis/angry-emoji-50.png");
const wowEmoji = require("./../assets/emojis/wow-emoji-50.png");
const cryingEmoji = require("./../assets/emojis/crying-emoji-50.png");
const defaultAvatar = require("./../assets/images/avatar.png");

import Colors from "./../constants/Colors";
import Constant from "expo-constants";
import { useSelector } from "react-redux";

HEADER_MAX_HEIGHT = 195;
HEADER_MIN_HEIGHT = 195;
PROFILE_IMAGE_MAX_HEIGHT = 200;
PROFILE_IMAGE_MIN_HEIGHT = 200;

const ProfileScreen = (props) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [showablePostId, setShowablePostId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  const navigation = useNavigation();
  let scrollY = new Animated.Value(0);

  let output = null;

  const onContentHeightModalOpen = (postId) => {
    setShowablePostId(postId);
    modalizeRef.current.open();
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const dispatch = useDispatch();

  const getProfileUserPosts = () => {
    console.log("Make an API call to fetch profile user Posts");
  };

  const getProfileUserInfo = () => {
    console.log("Make an API call to fetch profile user Info");
  };

  const getProfileUserPhotos = () => {
    console.log("Make an API call to fetch profile user Photos");
  };

  const getProfileUserFriends = () => {
    console.log("Make an API call to fetch profile user Friends");
  };

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
    outputRange: [-40, -40, -40, -20],
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

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let receivedPosts = await dispatch(
        getIndividualUserPosts(loggedInUserDetails._id)
      );
      console.log("Posts received...");
      console.log(receivedPosts);
      setPosts(receivedPosts.posts);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Dispatch action returned an error");
      console.log(err);
      // setError(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    Image.getSize(imagesUrl + coverPhoto, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    });
  }, [loggedInUserDetails]);

  const renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.content__subheading}>
        {"Last step".toUpperCase()}
      </Text>
      <Text style={styles.content__heading}>
        Send the message? - {showablePostId}
      </Text>
      <Text style={styles.content__description}>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.content__description}
        activeOpacity={0.75}
        onPress={() => setToggle(!toggle)}
      >
        <Text>adjustToContentHeight {JSON.stringify(toggle)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.content__button}
        activeOpacity={0.75}
        onPress={handleClose}
      >
        <Text style={styles.content__buttonText}>{"Send".toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  Image.getSize(imagesUrl + coverPhoto, (width, height) => {
    // calculate image width and height
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;
    setImgWidth(screenWidth);
    setImgHeight(imageHeight);
  });

  let loopId = 1;

  const onRefresh = () => {
    // sendPushNotification();
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  };

  if (isLoading) {
    output = (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (posts.length === 0) {
    output = <Text> No posts to show </Text>;
  } else if (posts.length > 0) {
    output = (
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => onRefresh()}
            tintColor="red"
            colors={["red", "green", "blue"]}
            title="Refreshing..."
          />
        }
        keyExtractor={(item) => item._id + loopId}
        renderItem={(itemData) => {
          let displayPage;
          let userPrimaryDp = itemData.item.postedBy.primaryDp
            ? imagesUrl + itemData.item.postedBy.primaryDp
            : defaultAvatar;

          // console.log("userPrimaryDp --> " + userPrimaryDp);

          if (itemData.item.postTypeId === 1 || itemData.item.postTypeId === 3)
            displayPage = (
              <DefaultAndCustomBgAndTextColorPost
                key={loopId++}
                postData={itemData.item.postProperties}
                postTypeId={itemData.item.postTypeId}
              />
            );
          else if (itemData.item.postTypeId === 4)
            displayPage = (
              <CustomBgAndTextAndBorderColorPost
                postData={itemData.item.postProperties}
                postTypeId={itemData.item.postTypeId}
              />
            );
          else if (itemData.item.postTypeId === 2)
            displayPage = (
              <PhotosPost
                postData={itemData.item.postProperties}
                postTypeId={itemData.item.postTypeId}
              />
            );
          else if (itemData.item.postTypeId === 5)
            displayPage = (
              <CustomBgAndTextAndCornerPost
                postData={itemData.item.postProperties}
                postTypeId={itemData.item.postTypeId}
              />
            );

          let postUserImage;
          if (itemData.item.postedBy.primaryDp) {
            postUserImage = (
              <Image
                style={styles.postUserDp}
                source={{
                  uri: imagesUrl + itemData.item.postedBy.primaryDp,
                }}
              />
            );
          } else {
            postUserImage = (
              <Image style={styles.postUserDp} source={defaultAvatar} />
            );
          }
          return (
            <View style={styles.singlePostContainer}>
              <View style={styles.postAndUserDetailsContainer}>
                <View style={styles.postDpContainer}>{postUserImage}</View>
                <View style={styles.postUserNameTimeContainer}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {itemData.item.postedBy.fullName}
                  </Text>
                  <Text style={{ color: "#000" }}>
                    5th Jan 2017 - 08:51:25 AM
                  </Text>
                </View>
                <TouchableOpacity style={styles.hrDots} activeOpacity={0.75}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="black"
                    onPress={() => onContentHeightModalOpen(itemData.item._id)}
                  />
                </TouchableOpacity>
              </View>
              <View>{displayPage}</View>
              <PostReactions postDetails={itemData.item} />
            </View>
          );
        }}
      />
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
              // zIndex: headerZindex,
              // elevation: headerZindex, //required for android
              alignItems: "center",
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                position: "absolute",
                bottom: headerTitleBottom,
                backgroundColor: "#ddd",
                display: "flex",
                flexDirection: "row",
                height: 50,
                alignItems: "center",
                marginTop: 200,
              }}
            >
              <Text style={styles.menuItem} onPress={getProfileUserPosts}>
                Timeline
              </Text>
              <Text style={styles.menuItem} onPress={getProfileUserFriends}>
                Friends
              </Text>
              <Text style={styles.menuItem} onPress={getProfileUserInfo}>
                About
              </Text>
              <Text style={styles.menuItem} onPress={getProfileUserPhotos}>
                Photos
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
            {/* <View style={{ marginTop: 5 }}>
              <View style={styles.userDetailsContainer}>
                <Text>
                  This is Profile screen! {loggedInUserDetails.primaryDp}
                </Text>
                <Text>{loggedInUserDetails.primaryDp}</Text>
                <Text>{loggedInUserDetails.secondaryDp}</Text>
                <Text>{loggedInUserDetails.profileCoverPhoto}</Text>
              </View>
            </View> */}
            {output}
          </ScrollView>
        </View>
        <Modalize ref={modalizeRef} adjustToContentHeight={toggle}>
          {renderContent()}
        </Modalize>
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
  menuItem: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
    // marginBottom: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  singlePostContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#999",
    borderBottomColor: "#999",
  },
  postAndUserDetailsContainer: {
    flexDirection: "row",
    // height: 55,
    alignItems: "center",
    padding: 5,
  },
  postDpContainer: {
    height: "100%",
  },
  postUserDp: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  postUserNameTimeContainer: {
    flex: 2,
    marginHorizontal: 10,
  },
  content__header: {
    padding: 10,
    paddingBottom: 0,
    backgroundColor: Colors.siteColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  content__subheading: {
    marginBottom: 20,
    fontSize: 16,
    color: "#ccc",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,
    marginRight: 20,
    backgroundColor: "#ccc",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },
  hrDots: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
  singleEmoji: {
    height: 30,
    width: 30,
  },
});

export default ProfileScreen;
