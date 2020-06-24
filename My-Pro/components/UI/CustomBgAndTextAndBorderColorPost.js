import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndBorderColorPost = (props) => {
  const { postData } = props;
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [borderTopColor, setBorderTopColor] = useState("transparent");
  const [borderRightColor, setBorderRightColor] = useState("transparent");
  const [borderBottomColor, setBorderBottomColor] = useState("transparent");
  const [borderLeftColor, setBorderLeftColor] = useState("transparent");
  const [borderStyle, setBorderStyle] = useState(null);
  const [brdrWidth, setBrdrWidth] = useState(2);
  // const [borderStyleSides, setBorderStyleSides] = useState("all");

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
      setBorderStyle("dashed");
      setBrdrWidth(2);
    } else {
      setBorderStyle(postData[0].borderStyle);
    }
  }, [postData]);
  return (
    <View
      style={{
        ...styles.postDescriptionContainer,
        backgroundColor,
        color: textColor,
      }}
    >
      <View
        style={{
          ...styles.postDescriptionContainer,
          borderTopColor,
          borderRightColor,
          borderBottomColor,
          borderLeftColor,
          borderTopWidth: brdrWidth,
          borderRightWidth: brdrWidth,
          borderBottomWidth: brdrWidth,
          borderLeftWidth: brdrWidth,
          borderStyle,
          backgroundColor,
          color: textColor,
          borderRadius: 1,
        }}
      >
        <Text style={{ ...styles.postDescription, color: textColor }}>
          {postData[0].postContent}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5,
    // zoom: 1,
  },
});

export default CustomBgAndTextAndBorderColorPost;
