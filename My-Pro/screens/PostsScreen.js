import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  AsyncStorage,
  Vibration,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Notifications } from "expo";
import { Modalize } from "react-native-modalize";

import { getAllUsersPosts } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";

import DefaultAndCustomBgAndTextColorPost from "./../components/UI/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../components/UI/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../components/UI/CustomBgAndTextAndCornerPost";
import PostReactions from "./../components/UI/PostReactions";
import PhotosPost from "./../components/UI/PhotosPost";

const defaultAvatar = require("./../assets/images/avatar.png");

const PostsScreen = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesUrl, setImagesUrl] = useState(
    "http://192.168.43.22:8088/photo/"
  );
  const [posts, setPosts] = useState([]);
  const modalizeRef = useRef(null);
  const reactionsModalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);

  const onContentHeightModalOpen = () => {
    modalizeRef.current?.open();
  };

  const onReactionsShowableModalOpen = () => {
    reactionsModalizeRef.current?.open();
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  };

  const dispatch = useDispatch();

  const logOutHandler = () => {
    const tryLogOut = async () => {
      const remover = await AsyncStorage.removeItem("authToken");
      props.navigation.navigate("Auth");
      return;
    };

    tryLogOut();
    props.navigation.navigate("Login");
  };

  closeModals = () => {
    setDisplayContentHeightModal(false);
  };

  useEffect(() => {
    props.navigation.setParams({ logout: logOutHandler });
    fetchData();
    setImagesUrl("http://192.168.43.22:8088/photo/");
    let _notificationSubscription = Notifications.addListener(
      _handleNotification
    );
    // sendPushNotification();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let receivedPosts = await dispatch(getAllUsersPosts());
      console.log("Posts received...");
      // console.log(receivedPosts);
      setPosts(receivedPosts.posts);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Dispatch action returned an error");
      console.log(err);
      // setError(err.message);
    }
  }, [dispatch]);

  const _handleNotification = (notification) => {
    // Vibration.vibrate();
    console.log(notification);
  };

  const sendPushNotification = async () => {
    const notifyToken = await AsyncStorage.getItem("notifyToken");
    console.log("notifyToken --> " + notifyToken);
    if (notifyToken) {
      console.log("Notify token stored");

      const message = [
        {
          to: notifyToken,
          sound: "default",
          title: "Demo",
          body: "Demo notificaiton",
          priority: "high",
          data: { data: "goes here" },
          _displayInForeground: true,
        },
        {
          to: notifyToken,
          sound: "default",
          title: "Demo - 2",
          body: "Demo notificaiton - 2",
          priority: "high",
          data: { data: "goes here - 2" },
          _displayInForeground: true,
        },
      ];

      let response = fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } else {
      console.log("Notify token not stored");
      alert("Notify token not stored");
      props.navigation.navigate("LoggedIn");
    }
  };

  const renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.content__subheading}>
        {"Last step".toUpperCase()}
      </Text>
      <Text style={styles.content__heading}>Send the message?</Text>
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

  const renderReactionsModalizeContent = () => [
    <View style={styles.content__header} key="0">
      <Text style={styles.content__heading}>Article title</Text>
      <Text style={styles.content__subheading}>November 11st 2018</Text>
    </View>,

    <View style={styles.content__inside} key="1">
      <Text style={styles.content__paragraph}>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
      </Text>
      <Text style={[s.content__subheading, { marginTop: 30 }]}>
        Horizontal ScrollView
      </Text>

      <ScrollView style={styles.content__scrollview} horizontal>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <View key={i} style={styles.content__block} />
          ))}
      </ScrollView>

      <Text style={styles.content__paragraph}>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
      </Text>

      <TextInput
        style={styles.content__input}
        placeholder="Type your username"
        clearButtonMode="while-editing"
      />
    </View>,
  ];

  let loopId = 1;

  const onRefresh = () => {
    // sendPushNotification();
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (posts.length === 0) {
    return <Text> No posts to show </Text>;
  }

  // if (isLoading && posts.length > 0) {
  //   return (
  //     <View style={styles.box}>
  //       <View style={styles.card}>
  //         <View style={styles.card__corner}>
  //           <View style={styles.card__corner_triangle}></View>
  //         </View>
  //         <Text style={styles.para}>
  //           GitHub Atom IDE Vanilla JavaScript Emmett WordPress Markdown
  //           BitBucket Private Repos are FREE! LESS or SCSS Grunt vs Gulp —
  //           csstricks.com is awesome.
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }

  if (posts.length > 0) {
    return (
      <View style={styles.container}>
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

            console.log("userPrimaryDp --> " + userPrimaryDp);

            if (
              itemData.item.postTypeId === 1 ||
              itemData.item.postTypeId === 3
            )
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
                  source={{ uri: imagesUrl + itemData.item.postedBy.primaryDp }}
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
                  <View
                    style={styles.postUserNameTimeContainer}
                    onPress={onReactionsShowableModalOpen}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {itemData.item.postedBy.fullName}
                    </Text>
                    <Text style={{ color: "#000" }}>
                      5th Jan 2017 - 08:51:25 AM
                    </Text>
                  </View>
                  <View style={styles.hrDots}>
                    <Text>
                      <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="black"
                        onPress={onContentHeightModalOpen}
                      />
                    </Text>
                  </View>
                </View>
                <View>{displayPage}</View>
                <PostReactions postDetails={itemData.item} />
              </View>
            );
          }}
        />
        {/* <Modalize ref={modalizeRef} adjustToContentHeight={toggle}>
          {renderContent()}
        </Modalize> */}

        <Modalize
          ref={reactionsModalizeRef}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
            stickyHeaderIndices: [0],
          }}
        >
          {renderReactionsModalizeContent()}
        </Modalize>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>This is Posts screen!</Text>
        <Button
          title="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
        <Text>{posts.length}</Text>
      </View>
    );
  }
};

PostsScreen.navigationOptions = (navData) => {
  const logoutFn = navData.navigation.getParam("logout");
  return {
    headerTitle: "Posts",
    headerRight: () => (
      <Ionicons
        name="md-log-out"
        size={25}
        color="#fff"
        title="Logout"
        onPress={logoutFn}
        style={styles.logout}
      />
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
    // marginBottom: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  logout: {
    paddingHorizontal: 10,
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
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
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
  // box: {
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 5,
  // },
  // card: {
  //   padding: 13,
  //   backgroundColor: "red",
  //   marginVertical: 5,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "relative",
  //   width: "90%",
  //   overflow: "hidden",
  //   borderRadius: 3,
  // },
  // card__corner: {
  //   position: "absolute",
  //   top: 0,
  //   right: 0,
  //   width: 30,
  //   height: 30,
  //   backgroundColor: "red",
  //   borderRadius: 3,
  // },
  // card__corner_triangle: {
  //   position: "absolute",
  //   width: 0,
  //   height: 0,
  //   borderRightWidth: 30,
  //   borderBottomWidth: 30,
  //   borderTopColor: "transparent",
  //   borderRightColor: "#ffffff",
  //   borderTopColor: "transparent",
  //   borderBottomColor: "transparent",
  //   shadowColor: "red",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.22,
  //   elevation: 3,
  //   borderBottomLeftRadius: 8,
  // },
  // para: {
  //   padding: 10,
  //   color: "#fff",
  // },
});

export default PostsScreen;
