import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { Constants } from "expo";
// or any pure javascript modules available in npm
import { Button } from "react-native-elements"; // 1.0.0-beta

import Modal from "react-native-modal"; // 5.0.0-0

// import "@expo/vector-icons"; // 6.2.2
export default class ScrollAndSwipeable extends Component {
  state = {
    isVisible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
        </Text>
        <Button
          title="Open Modal"
          onPress={() => this.setState({ isVisible: true })}
        />

        <Modal
          isVisible={this.state.isVisible}
          style={styles.modal}
          onBackButtonPress={() => this.setState({ isVisible: false })}
          onBackdropPress={() => this.setState({ isVisible: false })}
          onSwipeComplete={() => this.setState({ isVisible: false })}
          onSwipeThreshold={20}
          swipeDirection="down"
        >
          <View style={{ backgroundColor: "white" }}>
            <Text style={styles.fixedHeaderContainer}>
              So, here we have added one Button, and also, we have imported the
              image file.
            </Text>
            <TouchableOpacity activeOpacity={1} style={{ zIndex: 100 }}>
              <ScrollView>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>

                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
                <Text style={styles.text}>
                  So, here we have added one Button, and also, we have imported
                  the image file. Right now, we have not used it yet, but we
                  will use it in a minute. Our goal is when the user clicks the
                  button, Modal will pop up otherwise it will not pop up, and we
                  can’t see it. So, now we import one more component and pass
                  the Image and Text as a prop to that component. Also, by
                  default Modal is always open, so we need to handle it our way.
                  That is why we need the state which we can control, and
                  ultimately we control the Modal.
                </Text>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  fixedHeaderContainer: {
    backgroundColor: "blue",
    color: "#fff",
    padding: 15,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  modal: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: Platform.OS === "ios" ? 14 : 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    // marginLeft: 150,
  },
});
