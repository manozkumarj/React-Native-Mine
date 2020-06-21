import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const DefaultAndCustomBgAndTextColorPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const { postData, postTypeId } = props;
  useEffect(() => {
    // console.log(props);
    if (postTypeId === 3) {
      setBackgroundColor("#" + postData[0].backgroundColor);
      setTextColor("#" + postData[0].textColor);
    }
  }, [postData]);
  return (
    <View
      style={styles.postDescriptionDiv}
      style={{ backgroundColor, color: textColor }}
    >
      <Text style={styles.postDescription}>{postData[0].postContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postDescriptionDiv: {
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
    // zoom: 1,
  },
});

export default DefaultAndCustomBgAndTextColorPost;
