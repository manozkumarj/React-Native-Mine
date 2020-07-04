import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "./../constants/Colors";
import { Modalize } from "react-native-modalize";

import Constant from "expo-constants";
const defaultAvatar = require("./../assets/images/avatar.png");

const CommentsScreen = (props) => {
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const { postId, commentsArray } = props.route.params;
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  // console.log("postId -> " + postId);
  // console.log("commentsArray -> " + JSON.stringify(commentsArray));

  const showTinyModal = (postId) => {
    modalizeRef.current.open();
  };

  const deleteComment = () => {
    console.log("Need to delete this comment");
    modalizeRef.current.close();
  };

  const renderContent = () => (
    <View style={styles.modalContainer}>
      {/* <Text style={{  backgroundColor: "#ddd" }}></Text> */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={deleteComment}
          style={styles.deleteOptionContainer}
          activeOpacity={0.75}
        >
          <Text style={styles.deleteOption}>Delete this comment</Text>
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
                <TouchableOpacity style={styles.hrDots} activeOpacity={0.75}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="black"
                    onPress={() => showTinyModal()}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.commentContentContainer}>
                <Text style={styles.comment}>{comment.comment}</Text>
              </View>
            </View>
          );
        })
      )}
      <Modalize ref={modalizeRef} adjustToContentHeight={toggle}>
        {renderContent()}
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
    marginTop: Constant.statusBarHeight,
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

export default CommentsScreen;
