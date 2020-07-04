import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "./../constants/Colors";

const loveHeartsEyesEmoji = require("./../assets/emojis/love-hearts-eyes-emoji-50.png");
const likeThumbEmoji = require("./../assets/emojis/like-thumb-emoji-50.png");
const dislikeThumbEmoji = require("./../assets/emojis/dislike-thumb-emoji-50.png");
const laugherEmoji = require("./../assets/emojis/face-with-tears-of-joy-emoji-50.png");
const angryEmoji = require("./../assets/emojis/angry-emoji-50.png");
const wowEmoji = require("./../assets/emojis/wow-emoji-50.png");
const cryingEmoji = require("./../assets/emojis/crying-emoji-50.png");

import Constant from "expo-constants";
const defaultAvatar = require("./../assets/images/avatar.png");

const ReactionsScreen = (props) => {
  const { postId, reactionsArray } = props.route.params;
  const imagesUrl = "http://192.168.43.22:8088/photo/";
  // console.log("postId -> " + postId);
  // console.log("reactionsArray -> " + JSON.stringify(reactionsArray));

  return (
    <View style={styles.container}>
      {reactionsArray.length === 0 ? (
        <View style={styles.screenContainer}>
          <Text style={styles.noReactions}>No Reactions yet</Text>
        </View>
      ) : (
        reactionsArray.map((reaction) => {
          let reactedUserFullname = reaction.reactedBy.fullName;

          let reactedUserImage;
          if (reaction.reactedBy.primaryDp) {
            reactedUserImage = (
              <Image
                style={styles.postUserDp}
                source={{ uri: imagesUrl + reaction.reactedBy.primaryDp }}
              />
            );
          } else {
            reactedUserImage = (
              <Image style={styles.postUserDp} source={defaultAvatar} />
            );
          }

          let reactionEmoji;

          if (reaction.reactionTypeId === 1) reactionEmoji = likeThumbEmoji;
          else if (reaction.reactionTypeId === 2)
            reactionEmoji = dislikeThumbEmoji;
          else if (reaction.reactionTypeId === 3)
            reactionEmoji = loveHeartsEyesEmoji;
          else if (reaction.reactionTypeId === 4) reactionEmoji = wowEmoji;
          else if (reaction.reactionTypeId === 5) reactionEmoji = laugherEmoji;
          else if (reaction.reactionTypeId === 6) reactionEmoji = cryingEmoji;
          else if (reaction.reactionTypeId === 7) reactionEmoji = angryEmoji;

          return (
            <View style={styles.singlePostContainer} key={reaction._id}>
              <View style={styles.postAndUserDetailsContainer}>
                <View style={styles.postDpContainer}>{reactedUserImage}</View>
                <View style={styles.postUserNameTimeContainer}>
                  <Text style={styles.reactedUserName}>
                    {reactedUserFullname} - {reaction.reactionTypeId}
                  </Text>
                </View>
                <View>
                  <Image source={reactionEmoji} style={styles.singleEmoji} />
                </View>
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
    marginTop: Constant.statusBarHeight,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  noReactions: {
    fontSize: 20,
  },
  singlePostContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#999",
    borderBottomColor: "#999",
  },
  postAndUserDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  reactedUserName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.siteColor,
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
    color: Colors.siteColor,
  },
  singleEmoji: {
    height: 30,
    width: 30,
  },
});

export default ReactionsScreen;
