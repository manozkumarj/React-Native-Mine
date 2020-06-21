import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";

import { getAllUsersPosts } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";

import DefaultAndCustomBgAndTextColorPost from "./../components/UI/DefaultAndCustomBgAndTextColorPost";

const PostsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const logOutHandler = () => {
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    props.navigation.setParams({ logout: logOutHandler });
    fetchData();
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

  if (posts.length > 0) {
    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id + loopId}
        renderItem={(itemData) => {
          let displayPage;
          if (itemData.item.postTypeId === 1 || itemData.item.postTypeId === 3)
            displayPage = (
              <DefaultAndCustomBgAndTextColorPost
                key={loopId++}
                postData={itemData.item.postProperties}
                postTypeId={itemData.item.postTypeId}
              />
            );
          return displayPage;
        }}
      />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    paddingHorizontal: 10,
  },
});

export default PostsScreen;
