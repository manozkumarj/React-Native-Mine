import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomBgAndTextAndCornerPost = (props) => {
  const [postBackgroundColor, setBackgroundColor] = useState("#ffffff");
  const [cornerStyleSides, setCornerStyleSides] = useState("all");
  const [cornerStyle, setCornerStyle] = useState("cut");
  const [textColor, setTextColor] = useState("#000000");

  const { postData } = props;
  useEffect(() => {
    // console.log(props);
    setBackgroundColor("#" + postData[0].backgroundColor);
    setCornerStyleSides(postData[0].cornerStyleSides);
    setCornerStyle(postData[0].cornerStyle);
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

  const getTriangleStyles = (property, getColor, cornerStyle) => {
    let set1;
    let set2;
    if (property === "topLeft") {
      set1 = {
        borderTopWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: "#fff",
        borderRightColor: getColor,
        borderBottomColor: "#fff",
        borderLeftColor: getColor,
        shadowColor: "#000",
        backgroundColor: getColor,
      };
      if (cornerStyle === "fold") {
        set2 = {
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,
          elevation: 23,
          // borderBottomRightRadius: 8,
        };
      }
      return { ...set1, ...set2 };
    } else if (property === "topRight") {
      set1 = {
        borderTopWidth: 0,
        borderRightWidth: 25,
        borderBottomWidth: 25,
        borderLeftWidth: 0,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: getColor,
        shadowColor: "#000",
        backgroundColor: getColor,
      };

      if (cornerStyle === "fold") {
        set2 = {
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,
          elevation: 23,
          // borderBottomLeftRadius: 8,
        };
      }
      return { ...set1, ...set2 };
    } else if (property === "bottomLeft") {
      set1 = {
        borderTopWidth: 25,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 25,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: "#fff",
        shadowColor: "#000",
        backgroundColor: getColor,
      };

      if (cornerStyle === "fold") {
        set2 = {
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,
          elevation: 23,
          // borderTopRightRadius: 8,
        };
      }
      return { ...set1, ...set2 };
    } else if (property === "bottomRight") {
      set1 = {
        borderTopWidth: 25,
        borderRightWidth: 25,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: getColor,
        borderRightColor: "#fff",
        borderBottomColor: getColor,
        borderLeftColor: "#fff",
        shadowColor: "#000",
        backgroundColor: getColor,
      };

      if (cornerStyle === "fold") {
        set2 = {
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.57,
          shadowRadius: 15.19,
          elevation: 23,
          // borderBottomRightRadius: 8,
        };
      }
      return { ...set1, ...set2 };
    }
  };

  if (
    cornerStyleSides === "topLeft" ||
    cornerStyleSides === "topRight" ||
    cornerStyleSides === "bottomLeft" ||
    cornerStyleSides === "bottomRight"
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
                ...getTriangleStyles(
                  cornerStyleSides,
                  postBackgroundColor,
                  cornerStyle
                ),
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
              {cornerStyle}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (cornerStyleSides === "topLeftAndBottomRight") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("topLeft"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "topLeft",
                  postBackgroundColor,
                  cornerStyle
                ),
                backgroundColor: postBackgroundColor,
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("bottomRight"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "bottomRight",
                  postBackgroundColor,
                  cornerStyle
                ),
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
  } else if (cornerStyleSides === "topRightAndBottomLeft") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("topRight"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "topRight",
                  postBackgroundColor,
                  cornerStyle
                ),
                backgroundColor: postBackgroundColor,
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("bottomLeft"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "bottomLeft",
                  postBackgroundColor,
                  cornerStyle
                ),
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
  } else if (cornerStyleSides === "all") {
    return (
      <View style={styles.box}>
        <View style={{ ...styles.card, backgroundColor: postBackgroundColor }}>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("topLeft"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "topLeft",
                  postBackgroundColor,
                  cornerStyle
                ),
                backgroundColor: postBackgroundColor,
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("bottomRight"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "bottomRight",
                  postBackgroundColor,
                  cornerStyle
                ),
                backgroundColor: postBackgroundColor,
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("topRight"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "topRight",
                  postBackgroundColor,
                  cornerStyle
                ),
                backgroundColor: postBackgroundColor,
              }}
            ></View>
          </View>
          <View
            style={{
              ...styles.cornerFoldCommonStyles,
              ...getStyles("bottomLeft"),
              backgroundColor: postBackgroundColor,
            }}
          >
            <View
              style={{
                ...styles.cornerTriangleFoldcommonStyles,
                ...getTriangleStyles(
                  "bottomLeft",
                  postBackgroundColor,
                  cornerStyle
                ),
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
    padding: 3,
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
  removeCornerShadow: {
    shadowOffset: {},
    shadowColor: "transparent",
  },
});

export default CustomBgAndTextAndCornerPost;
