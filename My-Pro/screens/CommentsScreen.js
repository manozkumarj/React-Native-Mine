import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "./../constants/Colors";

const defaultAvatar = require("./../assets/images/avatar.png");

const CommentsScreen = (props) => {
  const { postId, commentsArray } = props.route.params;
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  // console.log("postId -> " + postId);
  // console.log("commentsArray -> " + JSON.stringify(commentsArray));

  return (
    <View style={styles.container}>
      {commentsArray.length === 0 ? (
        <View style={styles.screenContainer}>
          <Text style={styles.noComments}>No comments yet</Text>
        </View>
      ) : (
        commentsArray.map((comment) => {
          let commentedUserFullname = comment.commentedBy.fullName;

          let commentUserImage;
          if (comment.commentedBy.primaryDp) {
            commentUserImage = (
              <Image
                style={styles.postUserDp}
                source={{ uri: imagesUrl + comment.commentedBy.primaryDp }}
              />
            );
          } else {
            commentUserImage = (
              <Image style={styles.postUserDp} source={defaultAvatar} />
            );
          }
          return (
            <View style={styles.singlePostContainer} key={comment._id}>
              <View style={styles.postAndUserDetailsContainer}>
                <View style={styles.postDpContainer}>{commentUserImage}</View>
                <View style={styles.postUserNameTimeContainer}>
                  <Text style={styles.commentedUserName}>
                    {commentedUserFullname}
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
                    />
                  </Text>
                </View>
              </View>
              <View style={styles.commentContentContainer}>
                <Text style={styles.comment}>{comment.comment}</Text>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  noComments: {
    fontSize: 20,
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
  postUserDp: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  postUserNameTimeContainer: {
    flex: 2,
    marginHorizontal: 10,
  },
  commentedUserName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.siteColor,
  },
  hrDots: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
  commentContentContainer: {
    borderTopWidth: 1,
    borderTopColor: "#999",
  },
  comment: {
    padding: 10,
    fontSize: 15,
  },
});

export default CommentsScreen;
