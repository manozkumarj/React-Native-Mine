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

const SentRequestsScreen = (props) => {
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

  const imagesUrl = "http://192.168.43.22:8088/photo/";

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
        (friend) => friend.status === "sent"
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
        <Text style={styles.headerOptionText}>Sent Friend Requests</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : friendsArray.length === 0 ? (
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
          <Text style={styles.nofriends}>No Sent requests</Text>
        </View>
      ) : (
        <FlatList
          data={friendsArray}
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
            // console.log(itemData.item);
            const primaryDpUrl = itemData.item.friendId.primaryDp;
            const secondaryDpUrl = itemData.item.friendId.secondaryDp;
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
                <Image
                  style={styles.postUserPrimaryDp}
                  source={defaultAvatar}
                />
              );
            }

            if (secondaryDpUrl) {
              secondaryDpImage = (
                <Image
                  style={styles.postUserPrimaryDp}
                  source={{
                    uri: imagesUrl + secondaryDpUrl,
                  }}
                />
              );
            } else {
              secondaryDpImage = (
                <Image
                  style={styles.postUserPrimaryDp}
                  source={defaultAvatar}
                />
              );
            }

            let friendFullname = itemData.item.friendId.fullName;

            return (
              <View style={styles.postAndUserDetailsContainer}>
                <View style={styles.postDpContainer}>{primaryDpImage}</View>
                <View style={styles.postUserNameTimeContainer}>
                  <Text style={styles.friendedUserName}>{friendFullname}</Text>
                </View>
                <TouchableOpacity style={styles.hrDots} activeOpacity={0.75}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="black"
                    onPress={() => showTinyModal()}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
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
  singlePostContainer: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 5,
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
  postUserPrimaryDp: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  postUserNameTimeContainer: {
    flex: 2,
    marginHorizontal: 10,
  },
  friendedUserName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.siteColor,
  },
  hrDots: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
  friendContentContainer: {
    borderTopWidth: 1,
    borderTopColor: "#999",
  },
  modalContainer: {
    paddingVertical: 25,
  },
  optionsContainer: {
    height: 100,
    flexDirection: "column",
  },
  deleteOptionContainer: {
    backgroundColor: "red",
  },
  deleteOption: {
    color: "#fff",
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  closeOptionContainer: {
    backgroundColor: "#999",
  },
  closeOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 17,
  },
});

export default SentRequestsScreen;
