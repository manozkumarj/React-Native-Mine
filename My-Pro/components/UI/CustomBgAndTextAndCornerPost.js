import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndCornerPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [classes, setClasses] = useState("cornerFold cornerFoldStyle ");

  const { postData } = props;
  useEffect(() => {
    // console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setTextColor("#" + postData[0].textColor);
    if (postData[0].cornerStyle === "cut") {
      setClasses(
        "cornerFold cornerFoldStyle cornerFoldAndCut_" +
          postData[0].cornerStyleSides +
          " remove_cornerShadow"
      );
    } else {
      setClasses(
        "cornerFold cornerFoldStyle cornerFoldAndCut_" +
          postData[0].cornerStyleSides
      );
    }
  }, []);
  return (
    <View style={styles.postDescriptionDiv}>
      <View className={classes} style={{ backgroundColor, color: textColor }}>
        <Text style={styles.postDescription}>{postData[0].postContent}</Text>
      </View>
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

export default CustomBgAndTextAndCornerPost;
