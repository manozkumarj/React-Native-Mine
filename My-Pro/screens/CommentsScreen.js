import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
// import Colors from "./../constants/Colors";

const CommentsScreen = (props) => {
  const postId = props.navigation.getParam("postId");
  const commentsArray = props.navigation.getParam("commentsArray");
  return (
    <View>
      <View>
        <Text style={styles.content__heading}>
          Total Comments - {commentsArray.length}
        </Text>
      </View>

      <View>
        {commentsArray.length === 0 ? (
          <Text>No comments</Text>
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
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
                <Text>{comment.comment}</Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  singlePostContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
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
  hrDots: {
    paddingHorizontal: 5,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default CommentsScreen;
