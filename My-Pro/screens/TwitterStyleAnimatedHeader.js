import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
} from "react-native";

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

class TwitterStyleAnimatedHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5,
      ],
      extrapolate: "clamp",
    });
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
      outputRange: [0, 0, 1000],
      extrapolate: "clamp",
    });

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          5 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26,
      ],
      outputRange: [-70, -70, -70, -18],
      extrapolate: "clamp",
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "lightskyblue",
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex, //required for android
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              width: "100%",
              position: "absolute",
              bottom: headerTitleBottom,
              backgroundColor: "yellow",
              // marginTop: 500,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Varun Nath
            </Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        >
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: "white",
              borderWidth: 3,
              overflow: "hidden",
              marginTop: profileImageMarginTop,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("./../assets/images/avatar.png")}
              style={{ flex: 1, width: null, height: null }}
            />
          </Animated.View>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontWeight: "bold", fontSize: 26, paddingLeft: 10 }}>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button
              </Text>
            </Text>
          </View>

          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }
}
export default TwitterStyleAnimatedHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
