import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const PhotosPost = (props) => {
  const [imagesUrl, setImagesUrl] = useState(
    "http://192.168.43.22:8088/photo/"
  );
  const [firstPhotoSrc, setfirstPhotoSrc] = useState(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const { postData } = props;
  let photosCount = postData[0]["photos"].length;
  let firstPhoto = postData[0]["photos"][0];
  useEffect(() => {
    setImagesUrl("http://192.168.43.22:8088/photo/");
    setfirstPhotoSrc(imagesUrl + firstPhoto);

    Image.getSize(imagesUrl + firstPhoto, (width, height) => {
      // calculate image width and height
      const screenWidth = Dimensions.get("window").width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    });
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
          style={{ width: imgWidth, height: imgHeight }}
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
    padding: 3,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  postDescription: {
    // wordWrap: "break-word",
    fontSize: 15,
    fontWeight: "normal",
    padding: 5,
    borderRadius: 5,
    // zoom: 1,
  },
  postPictureDiv: {
    flex: 1,
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
