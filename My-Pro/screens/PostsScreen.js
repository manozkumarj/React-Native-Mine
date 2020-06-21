import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";

import { getAllUsersPosts } from "./../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";

const PostsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // const posts = useSelector((state) => state.centralState.fetchedPosts);

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
    return <AppLoading />;
  }

  if (posts.length === 0) {
    return <Text> No posts to show </Text>;
  }

  if (posts.length > 0) {
    return posts.map((post) => {
      console.log("post._id --> " + post._id);
      return <Text key={loopId++}>{post._id}</Text>;
    });
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
