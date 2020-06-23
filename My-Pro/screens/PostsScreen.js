import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import defaultAvatar from "./../assets/images/avatar.png";

import { getAllUsersPosts } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";

import DefaultAndCustomBgAndTextColorPost from "./../components/UI/DefaultAndCustomBgAndTextColorPost";
import CustomBgAndTextAndBorderColorPost from "./../components/UI/CustomBgAndTextAndBorderColorPost";
import CustomBgAndTextAndCornerPost from "./../components/UI/CustomBgAndTextAndCornerPost";
import { Colors } from "react-native/Libraries/NewAppScreen";
const PostsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const logOutHandler = () => {
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    props.navigation.setParams({ logout: logOutHandler });
    fetchData();
    setImagesUrl("http://localhost:8088/photo/");
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      let receivedPosts = await dispatch(getAllUsersPosts());
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
  let loopId = 1;

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
          keyExtractor={(item) => item._id + loopId}
          renderItem={(itemData) => {
            let displayPage;
            let userPrimaryDp = itemData.item.postedBy.primaryDp
              ? imagesUrl + itemData.item.postedBy.primaryDp
              : defaultAvatar;

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
            else if (itemData.item.postTypeId === 5)
              displayPage = (
                <CustomBgAndTextAndCornerPost
                  postData={itemData.item.postProperties}
                  postTypeId={itemData.item.postTypeId}
                />
              );
            return (
              <View style={styles.singlePostContainer}>
                <View style={styles.postAndUserDetailsContainer}>
                  <View style={styles.postDpContainer}>
                    <Image
                      source={{ uri: userPrimaryDp }}
                      style={styles.postUserDp}
                    />
                  </View>
                  <View style={styles.postUserNameTimeContainer}>
                    <Text>{itemData.item.postedBy.fullName}</Text>
                  </View>
                </View>
                {/* <View>{displayPage}</View> */}
              </View>
            );
          }}
        />
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
    backgroundColor: Colors.bgColor,
    // alignItems: "center",
    // justifyContent: "center",
  },
  logout: {
    paddingHorizontal: 10,
  },
  singlePostContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#000",
    borderBottomColor: "#000",
  },
  postAndUserDetailsContainer: {
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    padding: 5,
  },
  postDpContainer: {
    height: "100%",
  },
  postUserDp: {
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  postUserNameTimeContainer: {
    marginHorizontal: 10,
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
