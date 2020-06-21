import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndBorderColorPost = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [borderTopColor, setBorderTopColor] = useState("transparent");
  const [borderRightColor, setBorderRightColor] = useState("transparent");
  const [borderBottomColor, setBorderBottomColor] = useState("transparent");
  const [borderLeftColor, setBorderLeftColor] = useState("transparent");
  const [borderStyle, setBorderStyle] = useState("solid");
  const [brdrWidth, setBrdrWidth] = useState(2);
  // const [borderStyleSides, setBorderStyleSides] = useState("all");

  const { postData } = props;
  useEffect(() => {
    // console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setTextColor("#" + postData[0].textColor);
    setBorderTopColor("#" + postData[0].borderTopColor);
    setBorderRightColor("#" + postData[0].borderRightColor);
    setBorderBottomColor("#" + postData[0].borderBottomColor);
    setBorderLeftColor("#" + postData[0].borderLeftColor);
    setBorderStyle(postData[0].borderStyle);
    // setBorderStyleSides(postData[0].borderStyleSides);
    if (postData[0].borderStyle === "double") {
      setBrdrWidth(4);
    }
  }, [postData]);
  return (
    <View
      style={styles.postDescriptionDiv}
      style={{ backgroundColor, color: textColor }}
    >
      <View
        style={styles.postDescriptionDiv}
        style={{
          borderTopColor,
          borderRightColor,
          borderBottomColor,
          borderLeftColor,
          borderStyle,
          borderWidth: brdrWidth,
        }}
      >
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

export default CustomBgAndTextAndBorderColorPost;
