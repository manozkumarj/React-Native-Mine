import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndCornerPost = (props) => {
  const [postBackgroundColor, setBackgroundColor] = useState("#ffffff");
  const [cornerStyleSides, setCornerStyleSides] = useState("all");
  const [textColor, setTextColor] = useState("#000000");

  const { postData } = props;
  useEffect(() => {
    // console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setCornerStyleSides(postData[0].cornerStyleSides);
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
    } else if (property === "bottomRight") {
      return {
        bottom: 0,
        right: 0,
      };
    }
  };

  const getTriangleStyles = (property, getColor) => {
    if (property === "topLeft") {
      return {
        borderTopWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: "#fff",
        borderRightColor: getColor,
        borderBottomColor: "#fff",
        borderLeftColor: getColor,
        shadowColor: getColor,
        backgroundColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 5,
        elevation: 20,
        borderBottomRightRadius: 8,
      };
    } else if (property === "topRight") {
      return {
        borderTopWidth: 0,
        borderRightWidth: 25,
        borderBottomWidth: 25,
        borderLeftWidth: 0,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: getColor,
        shadowColor: getColor,
        backgroundColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 5,
        elevation: 20,
        borderBottomLeftRadius: 8,
      };
    } else if (property === "bottomLeft") {
      return {
        borderTopWidth: 25,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 25,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: "#fff",
        shadowColor: getColor,
        backgroundColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 5,
        elevation: 20,
        borderTopRightRadius: 8,
      };
    } else if (property === "bottomRight") {
      return {
        borderTopWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: "#fff",
        shadowColor: getColor,
        backgroundColor: getColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 5,
        elevation: 20,
        borderTopLeftRadius: 8,
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
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
                backgroundColor: postBackgroundColor,
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
              {cornerStyleSides}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "topLeftAndBottomRight") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
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
              {cornerStyleSides}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "topRightAndBottomLeft") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
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
              {cornerStyleSides}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (postData[0].cornerStyleSides === "all") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles(cornerStyleSides),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(cornerStyleSides, postBackgroundColor),
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
              {cornerStyleSides}
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
    paddingHorizontal: 10,
  },
  card: {
    marginVertical: 10,
    padding: 12,
    position: "relative",
    overflow: "hidden",
    borderRadius: 3,
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
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  cornerTriangleFoldcommonStyles: {
    position: "absolute",
    borderStyle: "solid",
  },
});

export default CustomBgAndTextAndCornerPost;
