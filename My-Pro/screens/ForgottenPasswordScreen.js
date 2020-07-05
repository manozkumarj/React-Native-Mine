// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   Button,
//   ActivityIndicator,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// import Colors from "./../constants/Colors";
// import Card from "./../components/UI/Card";

// const ForgottenPasswordScreen = (props) => {
//   const [email, setEmail] = useState("");
//   const [disableButtons, setDisableButtons] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setDisableButtons(true);
//     setShowLoader(true);
//     if (email.trim()) {
//       console.log("Form submitted");
//       let loginDetails = {
//         email,
//         password,
//       };
//       console.log(loginDetails);
//       // props.loginUser(loginDetails);
//     } else {
//       setDisableButtons(false);
//       setShowLoader(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.wholeBg}>
//       <LinearGradient
//         colors={["transparent", "transparent"]}
//         style={styles.gradient}
//       >
//         <Card style={styles.loginContainer}>
//           <Text style={styles.pageTitle}>Forgotten Account</Text>
//           <View style={styles.dividableHr} />
//           <TextInput
//             placeholder="Enter Email"
//             email
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             style={styles.input}
//             placeholderTextColor="#9a73ef"
//           />
//           <View style={styles.buttonContainer}>
//             {isLoading ? (
//               <ActivityIndicator size="small" color={{ color: "white" }} />
//             ) : (
//               <Button title="Continue" color={Colors.siteColor} />
//             )}
//           </View>
//           <View style={styles.dividableHr} />
//           <View style={styles.buttonContainer}>
//             <Button
//               title="Login"
//               color={Colors.siteColor}
//               onPress={() => props.navigation.navigate("Login")}
//             />
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button
//               title="Register"
//               color={Colors.siteColor}
//               onPress={() => props.navigation.navigate("Register")}
//             />
//           </View>
//         </Card>
//       </LinearGradient>
//     </ScrollView>
//   );
// };

// // ForgottenPasswordScreen.navigationOptions = {
// //   headerTitle: "Forgotten Account",
// // };

// const styles = StyleSheet.create({
//   wholeBg: {
//     // backgroundColor: Colors.bgColor,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//   },
//   gradient: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     marginVertical: 30,
//   },
//   pageTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   loginContainer: {
//     flex: 1,
//     width: "85%",
//     padding: 20,
//     marginVertical: 5,
//     maxHeight: 320,
//   },
//   dividableHr: {
//     borderWidth: 1,
//     borderColor: Colors.siteColor,
//     marginVertical: 10,
//   },
//   input: {
//     borderColor: Colors.siteColor,
//     borderWidth: 1,
//     paddingVertical: 5,
//     paddingHorizontal: 6,
//     borderRadius: 3,
//     marginVertical: 5,
//     fontSize: 17,
//   },
//   buttonContainer: {
//     marginVertical: 5,
//   },
// });

// export default ForgottenPasswordScreen;

import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Body,
  Header,
  List,
  ListItem as Item,
  ScrollableTab,
  Tab,
  TabHeading,
  Tabs,
  Title,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255, 1)";
const FADED_THEME_COLOR = "rgba(85,186,255, 0.8)";

export default class ForgottenPasswordScreen extends Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, "white"],
    extrapolate: "clamp",
  });
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ["white", THEME_COLOR],
    extrapolate: "clamp",
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ["transparent", "transparent", THEME_COLOR],
    extrapolate: "clamp",
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: "clamp",
  });
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
  });
  tabContent = (x, i) => (
    <View style={{ height: this.state.height }}>
      <List
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          this.heights[i] = height;
          if (this.state.activeTab === i) this.setState({ height });
        }}
      >
        {new Array(x).fill(null).map((_, i) => (
          <Item key={i}>
            <Text>Item {i}</Text>
          </Item>
        ))}
      </List>
    </View>
  );
  heights = [500, 500];
  state = {
    activeTab: 0,
    height: 500,
  };

  constructor(props) {
    super(props);
    this.nScroll.addListener(
      Animated.event([{ value: this.scroll }], { useNativeDriver: false })
    );
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            backgroundColor: this.headerBg,
            zIndex: 1,
          }}
        >
          <Header style={{ backgroundColor: "transparent" }} hasTabs>
            <Body>
              <Title>
                <Animated.Text
                  style={{ color: this.textColor, fontWeight: "bold" }}
                >
                  Tab Parallax
                </Animated.Text>
              </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
            { useNativeDriver: true }
          )}
          style={{ zIndex: 0 }}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: Animated.multiply(this.nScroll, 0.65) },
                { scale: this.imgScale },
              ],
              backgroundColor: THEME_COLOR,
            }}
          >
            <Animated.View
              style={{
                height: IMAGE_HEIGHT,
                width: "100%",
                opacity: this.imgOpacity,
              }}
            >
              {/*gradient*/}
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0.9)",
                  "rgba(255,255,255,0.35)",
                  "rgba(255,255,255,0)",
                ]}
                locations={[0, 0.25, 1]}
                style={{ position: "absolute", height: "100%", width: "100%" }}
              />
              <Text>
                <Text>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
                <Text>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button
                </Text>
              </Text>
            </Animated.View>
          </Animated.View>
          <Tabs
            prerenderingSiblingsNumber={3}
            onChangeTab={({ i }) => {
              this.setState({ height: this.heights[i], activeTab: i });
            }}
            renderTabBar={(props) => (
              <Animated.View
                style={{
                  transform: [{ translateY: this.tabY }],
                  zIndex: 1,
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <ScrollableTab
                  {...props}
                  renderTab={(name, page, active, onPress, onLayout) => (
                    <TouchableOpacity
                      key={page}
                      onPress={() => onPress(page)}
                      onLayout={onLayout}
                      activeOpacity={0.4}
                    >
                      <Animated.View
                        style={{
                          flex: 1,
                          height: 100,
                          // backgroundColor: this.tabBg,
                        }}
                      >
                        <TabHeading
                          scrollable
                          style={{
                            // backgroundColor: "transparent",
                            width: SCREEN_WIDTH / 2,
                          }}
                          active={active}
                        >
                          <Animated.Text
                            style={{
                              fontWeight: active ? "bold" : "normal",
                              color: this.textColor,
                              fontSize: 14,
                            }}
                          >
                            {name}
                          </Animated.Text>
                        </TabHeading>
                      </Animated.View>
                    </TouchableOpacity>
                  )}
                  // underlineStyle={{ backgroundColor: this.textColor }}
                />
              </Animated.View>
            )}
          >
            <Tab heading="Tab 1">{this.tabContent(30, 0)}</Tab>
            <Tab heading="Tab 2">{this.tabContent(15, 1)}</Tab>
            <Tab heading="Tab 3">{this.tabContent(15, 1)}</Tab>
            <Tab heading="Tab 4">{this.tabContent(15, 1)}</Tab>
            <Tab heading="Tab 5">{this.tabContent(15, 1)}</Tab>
          </Tabs>
        </Animated.ScrollView>
      </View>
    );
  }
}
