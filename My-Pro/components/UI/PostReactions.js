import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "./../../constants/Colors";

const loveHeartsEyesEmoji = require("./../../assets/emojis/love-hearts-eyes-emoji-50.png");
const likeThumbEmoji = require("./../../assets/emojis/like-thumb-emoji-50.png");
const dislikeThumbEmoji = require("./../../assets/emojis/dislike-thumb-emoji-50.png");
const laugherEmoji = require("./../../assets/emojis/face-with-tears-of-joy-emoji-50.png");
const angryEmoji = require("./../../assets/emojis/angry-emoji-50.png");
const wowEmoji = require("./../../assets/emojis/wow-emoji-50.png");
const cryingEmoji = require("./../../assets/emojis/crying-emoji-50.png");

const PostReactions = (props) => {
  const [post, setPost] = useState(props.postDetails);
  const [showReactions, setShowReactions] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  let currentLoggedInUserId = useSelector(
    (state) => state.centralState.loggedInUserId
  );
  console.log("currentLoggedInUserId --> " + currentLoggedInUserId);

  // useEffect(() => {}, []);

  const handleLongPress = () => {
    setShowReactions(!showReactions);
    // alert("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleLikeReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleLoveReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleWowReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleLaughReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleCryReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleAngerReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleDislikeReaction = () => {
    setShowReactions(false);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  return (
    <View style={styles.wrapper}>
      {showReactions === true ? (
        <View style={styles.reactableEmojisMainHolder}>
          <View style={styles.reactableEmojisHolder}>
            <TouchableHighlight
              onPress={handleLikeReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={likeThumbEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleLoveReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={loveHeartsEyesEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleLaughReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={laugherEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleWowReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={wowEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleAngerReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={angryEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleCryReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={cryingEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleDislikeReaction}
              style={styles.singleTouchableEmoji}
            >
              <Image source={dislikeThumbEmoji} style={styles.singleEmoji} />
            </TouchableHighlight>
          </View>
        </View>
      ) : null}
      <View style={styles.postReactableItemsHolder}>
        <Text
          style={styles.postReactableItem}
          onPress={handleLikeReaction}
          onLongPress={handleLongPress}
        >
          Like
        </Text>
        <Text style={styles.postReactableItem}> Comment </Text>
        <Text style={styles.postReactableItem}> Share </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderTopColor: "#999",
  },
  postReactableItemsHolder: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // borderTopWidth: 1,
    // borderTopColor: "#ccc",
  },
  postReactableItem: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    // borderColor: "red",
    // borderWidth: 1,
  },
  reactableEmojisMainHolder: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 10,
    borderColor: Colors.siteColor,
    borderWidth: 2,
    height: 60,
    borderRadius: 50,
    marginVertical: 5,
  },
  reactableEmojisHolder: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // borderRadius: 20,
    zIndex: 20,
    borderRadius: 50,
  },
  singleEmoji: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  singleTouchableEmoji: {
    padding: 5,
  },
});

export default PostReactions;
