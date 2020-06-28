import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

  const handleLongPress = () => {
    setShowReactions(!showReactions);
    // alert("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleLikeReaction = () => {
    setShowReactions(false);
  };

  const handleLoveReaction = () => {
    setShowReactions(false);
  };

  const handleWowReaction = () => {
    setShowReactions(false);
  };

  const handleLaughReaction = () => {
    setShowReactions(false);
  };

  const handleCryReaction = () => {
    setShowReactions(false);
  };

  const handleAngerReaction = () => {
    setShowReactions(false);
  };

  const handleDislikeReaction = () => {
    setShowReactions(false);
  };

  return (
    <View>
      {showReactions === true ? (
        <View style={styles.reactableEmojisMainHolder}>
          <Text style={styles.reactableEmojisHolder}>
            <Image
              onPress={handleLikeReaction}
              source={likeThumbEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleLoveReaction}
              source={loveHeartsEyesEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleLaughReaction}
              source={laugherEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleWowReaction}
              source={wowEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleAngerReaction}
              source={angryEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleCryReaction}
              source={cryingEmoji}
              height="14"
              width="14"
            />
            <Image
              onPress={handleDislikeReaction}
              source={dislikeThumbEmoji}
              height="14"
              width="14"
            />
          </Text>
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
  postReactableItemsHolder: {
    flexDirection: "row",
    height: 50,
    // justifyContent: "center",
    alignItems: "center",
  },
  postReactableItem: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  reactableEmojisMainHolder: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
  },
  reactableEmojisHolder: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 120,
    top: -72,
    borderRadius: 20,
  },
});

export default PostReactions;
