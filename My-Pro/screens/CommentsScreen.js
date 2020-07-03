import React, { useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "./../constants/Colors";
import { Modalize } from "react-native-modalize";

const defaultAvatar = require("./../assets/images/avatar.png");

const CommentsScreen = (props) => {
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const { postId, commentsArray } = props.route.params;
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  // console.log("postId -> " + postId);
  // console.log("commentsArray -> " + JSON.stringify(commentsArray));

  const showTinyModal = (postId) => {
    modalizeRef.current?.open();
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
      ></TouchableOpacity>

      <TouchableOpacity style={styles.content__button} activeOpacity={0.75}>
        <Text style={styles.content__buttonText}>{"Send".toUpperCase()}</Text>
      </TouchableOpacity>
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
