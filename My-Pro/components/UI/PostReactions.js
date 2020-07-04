import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { upsertReaction } from "./../../redux/actionCreators";
import { useNavigation } from "@react-navigation/native";
import Colors from "./../../constants/Colors";

import Toast from "react-native-tiny-toast";

const loveHeartsEyesEmoji = require("./../../assets/emojis/love-hearts-eyes-emoji-50.png");
const likeThumbEmoji = require("./../../assets/emojis/like-thumb-emoji-50.png");
const dislikeThumbEmoji = require("./../../assets/emojis/dislike-thumb-emoji-50.png");
const laugherEmoji = require("./../../assets/emojis/face-with-tears-of-joy-emoji-50.png");
const angryEmoji = require("./../../assets/emojis/angry-emoji-50.png");
const wowEmoji = require("./../../assets/emojis/wow-emoji-50.png");
const cryingEmoji = require("./../../assets/emojis/crying-emoji-50.png");

const PostReactions = (props) => {
  let currentLoggedInUserId = useSelector(
    (state) => state.centralState.loggedInUserId
  );

  const [post, setPost] = useState(props.postDetails);
  const [showReactions, setShowReactions] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(currentLoggedInUserId);
  const [isReactedToThisPost, setIsReactedToThisPost] = useState(false);
  const [reactedTypeInText, setReactedTypeInText] = useState("Like");
  const [postReactions, setPostReactions] = useState(
    props.postDetails.reactions
  );
  const [postComments, setPostComments] = useState(props.postDetails.comments);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setPostReactions(props.postDetails.reactions);
    setPostComments(props.postDetails.comments);
    // console.log("currentLoggedInUserId --> " + currentLoggedInUserId);
    // setLoggedInUserId(currentLoggedInUserId);
    // console.log("postReactions are showing below");
    // console.log(postReactions);

    if (postReactions && postReactions.length > 0) {
      let getIndex = postReactions.findIndex(
        (user) => user.reactedBy._id === loggedInUserId
      );
      // console.log("loggedInUserId --> " + loggedInUserId);
      console.log("getIndex --> " + getIndex);

      if (getIndex > -1) {
        setIsReactedToThisPost(true);
        reactedTypeId = postReactions[getIndex]["reactionTypeId"];
        // console.log("reactedTypeId --> " + reactedTypeId);
        // console.log(postReactions[getIndex]["reactionTypeId"]);

        if (reactedTypeId === 1) setReactedTypeInText("Like");
        else if (reactedTypeId === 2) setReactedTypeInText("Dislike");
        else if (reactedTypeId === 3) setReactedTypeInText("Love");
        else if (reactedTypeId === 4) setReactedTypeInText("Wow");
        else if (reactedTypeId === 5) setReactedTypeInText("Laugh");
        else if (reactedTypeId === 6) setReactedTypeInText("Cry");
        else if (reactedTypeId === 7) setReactedTypeInText("Angry");
        else setReactedTypeInText("Like");

        // console.log("reactedTypeInText --> " + reactedTypeInText);
      }
    }
  }, [props.postDetails]);

  const handleLongPress = () => {
    setShowReactions(!showReactions);
    // alert("handleLongPress --> " + post._id + " -- " + showReactions);
  };

  const handleReactionRemover = () => {
    console.log(
      "handleReactionRemover --> " + post._id + " -- " + showReactions
    );
    setIsReactedToThisPost(false);
    doUpsertReaction("delete", null);
  };

  const handleLikeReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Like");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 1);
  };

  const handleDislikeReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Dislike");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 2);
  };

  const handleLoveReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Love");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 3);
  };

  const handleWowReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Wow");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 4);
  };

  const handleLaughReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Laugh");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 5);
  };

  const handleCryReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Cry");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 6);
  };

  const handleAngerReaction = () => {
    setShowReactions(false);
    setReactedTypeInText("Anger");
    setIsReactedToThisPost(true);
    console.log("handleLongPress --> " + post._id + " -- " + showReactions);
    doUpsertReaction("add", 7);
  };

  const doUpsertReaction = (actionType, reactionTypeId) => {
    if (actionType === "add") {
      let filterPostReactions = postReactions.filter(
        (reaction) => reaction.reactedBy !== loggedInUserId
      );
      // setPostReactions(filterPostReactions);

      let addUserToReactions = {
        reactedBy: loggedInUserId,
        reactionTypeId,
      };
      // let addd = postReactions.push(addUserToReactions);
      // console.log(postReactions);
      // console.log(addd);
      setPostReactions([...filterPostReactions, addUserToReactions]);
      setIsReactedToThisPost(true);
    } else if (actionType === "delete") {
      let filterPostReactions = postReactions.filter(
        (reaction) => reaction.reactedBy !== loggedInUserId
      );
      setPostReactions(filterPostReactions);
      setIsReactedToThisPost(false);
    }
    executeUpsertReaction(post._id, actionType, reactionTypeId);
  };

  const executeUpsertReaction = useCallback(
    async (postId, actionType, reactionTypeId) => {
      try {
        let upsertReactionResponse = await dispatch(
          upsertReaction(postId, actionType, reactionTypeId)
        );
        console.log("upsertReaction succeeded");
        Toast.show("upsertReaction succeeded", {
          containerStyle: {
            // backgroundColor: "rgba(220,220,221,.80)",
            backgroundColor: Colors.siteColor,
            paddingHorizontal: 15,
            borderRadius: 20,
          },
          textColor: "#fff",
          duration: 1000,
        });
      } catch (err) {
        console.log("upsertReaction failed");
        console.log(err);
        Toast.show("upsertReaction failed", {
          containerStyle: {
            // backgroundColor: "rgba(220,220,221,.80)",
            backgroundColor: "red",
            paddingHorizontal: 15,
            borderRadius: 20,
          },
          textColor: "#fff",
          duration: 1000,
        });
      }
    },
    [dispatch]
  );

  const selectItemHandler = (type) => {
    let pageName;
    if (type === "comments") {
      pageName = "Comments";
      navigation.navigate(pageName, {
        postId: post._id,
        commentsArray: postComments,
      });
    } else {
      pageName = "Reactions";
      navigation.navigate(pageName, {
        postId: post._id,
        reactionsArray: postReactions,
      });
    }
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
        {!isReactedToThisPost ? (
          <Text
            style={styles.postReactableItem}
            onPress={handleLikeReaction}
            onLongPress={handleLongPress}
          >
            Like
          </Text>
        ) : (
          <Text
            style={{
              ...styles.postReactableItem,
              color: Colors.siteColor,
              fontSize: 25,
            }}
            onPress={handleReactionRemover}
            onLongPress={handleLongPress}
          >
            {reactedTypeInText}
          </Text>
        )}
        <Text
          style={styles.postReactableItem}
          onPress={() => selectItemHandler("comments")}
        >
          Comment
        </Text>
        <Text
          style={styles.postReactableItem}
          onPress={() => selectItemHandler("reactions")}
        >
          Share
        </Text>
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
