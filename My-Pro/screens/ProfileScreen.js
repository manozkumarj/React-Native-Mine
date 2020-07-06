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
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../constants/Colors";
import Constant from "expo-constants";
import { useSelector } from "react-redux";
import { getProfileUserDetailsAndPosts } from "./../redux/actionCreators";
import { Modalize } from "react-native-modalize";

import DefaultAndCustomBgAndTextColorPost from "./../components/UI/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../components/UI/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../components/UI/CustomBgAndTextAndCornerPost";
import PostReactions from "./../components/UI/PostReactions";
import PhotosPost from "./../components/UI/PhotosPost";

const defaultAvatar = require("./../assets/images/avatar.png");
const defaultCoverPic = require("./../assets/images/coverPic.jpeg");

const ProfileScreen = (props) => {
  const { username } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [showablePostId, setShowablePostId] = useState(0);
  let getLoggedInUserDetails = useSelector(
    (state) => state.centralState.loggedInUserDetails
  );

  let getProfilePageUserDetails = useSelector(
    (state) => state.centralState.profilePageUserDetails
  );

  let getLoggedInUserUsername = useSelector(
    (state) => state.centralState.loggedInUserDetails.username
  );

  let getStatus = getLoggedInUserUsername === username ? "true" : "false";

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
  const [posts, setPosts] = useState([]);
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const imagesUrl = "http://192.168.43.22:8088/photo/";

  const navigation = useNavigation();

  const dispatch = useDispatch();
  let output = null;

  useEffect(() => {
    fetchData();
  }, []);

  const onContentHeightModalOpen = (postId) => {
    setShowablePostId(postId);
    modalizeRef.current.open();
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

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
      setLoggedInUserDetails(receivedResponse.details.authUserdetails);
      setPosts(receivedResponse.details.posts);
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
  const coverPhotoUrl = profilePageUserDetails
    ? profilePageUserDetails.profileCoverPhoto
    : null;
  let primaryDpImage = null;
  let secondaryDpImage = null;
  let coverPhoto = null;

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

  if (coverPhotoUrl) {
    coverPhoto = (
      <Image
        style={{ width: imgWidth, height: imgHeight }}
        source={{
          uri: imagesUrl + coverPhotoUrl,
        }}
      />
    );
  } else {
    coverPhoto = (
      <Image style={{ width: "100%", height: 204 }} source={defaultCoverPic} />
    );
  }

  useEffect(() => {
    console.log("defaultCoverPic -> " + coverPhotoUrl);
    if (coverPhotoUrl) {
      Image.getSize(imagesUrl + coverPhotoUrl, (width, height) => {
        // calculate image width and height
        const screenWidth = Dimensions.get("window").width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImgWidth(screenWidth);
        setImgHeight(imageHeight);
      });
    }
  }, [profilePageUserDetails]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  let loopId = 1;

  const renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.content__subheading}>
        {"Last step".toUpperCase()}
      </Text>
      <Text>
        Send the message? - {showablePostId} - {isSessionAndProfileUserSame}
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

  if (isFetching) {
    output = (
      <View style={styles.loadingContainer}>
        <Text>Fetching...</Text>
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
          <View>{coverPhoto}</View>
          <View style={styles.dpsContainer}>
            {primaryDpImage}
            {secondaryDpImage}
          </View>
          <View style={styles.profileMenu}>
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
          </View>
          <View style={styles.userDetailsContainer}>{output}</View>
        </ScrollView>
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
    marginBottom: 30,
  },
  profileMenu: {
    width: "100%",
    backgroundColor: "#ddd",
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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
