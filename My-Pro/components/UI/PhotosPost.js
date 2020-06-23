import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const PhotosPost = (props) => {
  const [imagesUrl, setImagesUrl] = useState(
    "http://192.168.43.22:8088/photo/"
  );
  const [firstPhotoSrc, setfirstPhotoSrc] = useState(null);
  const win = Dimensions.get("window");

  const { postData } = props;
  let photosCount = postData[0]["photos"].length;
  let firstPhoto = postData[0]["photos"][0];
  useEffect(() => {
    setImagesUrl("http://192.168.43.22:8088/photo/");
    setfirstPhotoSrc(imagesUrl + firstPhoto);
  }, [postData]);

  console.log("logging first photo url");
  console.log(firstPhotoSrc);
  return (
    <View style={styles.postDescriptionAndPicContainer}>
      <View style={styles.postDescriptionContainer}>
        <Text style={styles.postDescription}>
          {postData[0].postContent} {imagesUrl + firstPhoto}
        </Text>
      </View>
      <View style={styles.postPictureDiv}>
        <Image
          source={{ uri: imagesUrl + firstPhoto }}
          style={styles.postPhoto}
        />
        {/* {photosCount > 1 && (
          <Text style={styles.absoluteBottomRight}>1 of {photosCount}</Text>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postDescriptionAndPicContainer: {
    flexDirection: "column",
  },
  postDescriptionContainer: {
    height: "auto",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  postDescription: {
    // wordWrap: "break-word",
    fontSize: 15,
    fontWeight: "normal",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    // zoom: 1,
  },
  postPictureDiv: {
    flex: 1,
  },
  postPhoto: {
    width: Dimensions.get("window").width,
    height: 500,
    resizeMode: "contain",
  },
  absoluteBottomRight: {
    position: "absolute",
    bottom: 10,
    right: 5,
    padding: 10,
    backgroundColor: "#fff",
    color: "#003d99",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
  },
});

export default PhotosPost;
