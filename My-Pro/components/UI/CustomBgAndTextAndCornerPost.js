import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndCornerPost = (props) => {
  const [postBackgroundColor, setBackgroundColor] = useState("#ffffff");
  const [borderStyleSides, setBorderStyleSides] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  const { postData } = props;
  useEffect(() => {
    // console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setBorderStyleSides("#" + postData[0].borderStyleSides);
    setTextColor("#" + postData[0].textColor);
  }, [postData]);

  const getStyles = (property) => {
    if (property === "topLeft") {
      return {
        top: 0,
        left: 0,
      };
    } else if (property === "topRight") {
      return {
        top: 0,
        right: 0,
      };
    } else if (property === "bottomLeft") {
      return {
        bottom: 0,
        left: 0,
      };
    } else if (property === "bottomLeft") {
      return {
        bottom: 0,
        right: 0,
      };
    }
  };

  const getTriangleStyles = (property, getColor) => {
    if (property === "topLeft") {
      return {
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: "#fff",
        borderRightColor: "transparent",
        borderBottomColor: "#fff",
        borderLeftColor: "transparent",
        shadowColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        elevation: 3,
        borderBottomRightRadius: 8,
      };
    } else if (property === "topRight") {
      return {
        borderTopWidth: 0,
        borderRightWidth: 20,
        borderBottomWidth: 20,
        borderLeftWidth: 0,
        borderTopColor: "transparent",
        borderRightColor: "#fff",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
        shadowColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        elevation: 3,
        borderBottomLeftRadius: 8,
      };
    } else if (property === "bottomLeft") {
      return {
        borderTopWidth: 20,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 20,
        borderTopColor: "transparent",
        borderRightColor: "#fff",
        borderBottomColor: "transparent",
        borderLeftColor: "#fff",
        shadowColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        elevation: 3,
        borderBottomLeftRadius: 8,
      };
    } else if (property === "bottomRight") {
      return {
        borderTopWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: "transparent",
        borderRightColor: "#fff",
        borderBottomColor: "transparent",
        borderLeftColor: "#fff",
        shadowColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        elevation: 3,
        borderBottomLeftRadius: 8,
      };
    }
  };

  if (
    postData[0].cornerStyleSides === "topLeft" ||
    postData[0].cornerStyleSides === "topRight" ||
    postData[0].cornerStyleSides === "bottomLeft" ||
    postData[0].cornerStyleSides === "bottomRight"
  ) {
    return (
      <View style={styles.box}>
        <View style={styles.card}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View style={styles.postDescriptionContainer} color={textColor}>
            <Text
              style={{
                ...styles.postDescription,
                backgroundColor: postBackgroundColor,
                color: textColor,
              }}
            >
              {postData[0].postContent}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "topLeftAndBottomRight") {
    return (
      <View style={styles.box}>
        <View style={styles.card}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View style={styles.postDescriptionContainer} color={textColor}>
            <Text
              style={{
                ...styles.postDescription,
                backgroundColor: postBackgroundColor,
                color: textColor,
              }}
            >
              {postData[0].postContent}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "topRightAndBottomLeft") {
    return (
      <View style={styles.box}>
        <View style={styles.card}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View style={styles.postDescriptionContainer} color={textColor}>
            <Text
              style={{
                ...styles.postDescription,
                backgroundColor: postBackgroundColor,
                color: textColor,
              }}
            >
              {postData[0].postContent}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "all") {
    return (
      <View style={styles.box}>
        <View style={styles.card}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(borderStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(borderStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View style={styles.postDescriptionContainer} color={textColor}>
            <Text
              style={{
                ...styles.postDescription,
                backgroundColor: postBackgroundColor,
                color: textColor,
              }}
            >
              {postData[0].postContent}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // return (
  //   <View style={styles.postDescription} color={textColor}>
  //     <View className={classes} style={{ backgroundColor, color: textColor }}>
  //       <Text style={styles.postDescription}>{postData[0].postContent}</Text>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  box: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  postDescriptionContainer: {
    height: "auto",
    paddingVertical: 12,
    paddingHorizontal: 10,
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
  cornerFoldCommonStyles: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#53A3B4",
    borderRadius: 2,
  },
  cornerTriangleFoldcommonStyles: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
});

export default CustomBgAndTextAndCornerPost;
