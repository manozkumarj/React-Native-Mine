import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class ModalTester extends Component {
  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={{ flex: 1 }} style={{ marginVertical: 100 }}>
        <Button
          style={{ marginVertical: 100 }}
          title="Show modal"
          onPress={this.toggleModal}
        />
        <Modal
          isVisible={this.state.isModalVisible}
          style={{ backgroundColor: "#fff", marginTop: 100 }}
          deviceWidth={deviceWidth}
          onSwipeComplete={this.toggleModal}
          swipeDirection={["down"]}
          // deviceHeight={300}
          propagateSwipe={true}
          scrollOffsetMax={400 - 300} // content height - ScrollView height
          // Swipeable={true}
          // Scrollable={true}
          onBackdropPress={this.toggleModal}
        >
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text>Hello!</Text>
              <Button title="Hide modal" onPress={this.toggleModal} />

              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button,
                Modal will pop up otherwise it will not pop up, and we can’t see
                it. So, now we import one more component and pass the Image and
                Text as a prop to that component. Also, by default Modal is
                always open, so we need to handle it our way. That is why we
                need the state which we can control, and ultimately we control
                the Modal.
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button,
                Modal will pop up otherwise it will not pop up, and we can’t see
                it. So, now we import one more component and pass the Image and
                Text as a prop to that component. Also, by default Modal is
                always open, so we need to handle it our way. That is why we
                need the state which we can control, and ultimately we control
                the Modal.
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button,
                Modal will pop up otherwise it will not pop up, and we can’t see
                it. So, now we import one more component and pass the Image and
                Text as a prop to that component. Also, by default Modal is
                always open, so we need to handle it our way. That is why we
                need the state which we can control, and ultimately we control
                the Modal.
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button,
                Modal will pop up otherwise it will not pop up, and we can’t see
                it. So, now we import one more component and pass the Image and
                Text as a prop to that component. Also, by default Modal is
                always open, so we need to handle it our way. That is why we
                need the state which we can control, and ultimately we control
                the Modal.
              </Text>
              <Text style={styles.text}>
                So, here we have added one Button, and also, we have imported
                the image file. Right now, we have not used it yet, but we will
                use it in a minute. Our goal is when the user clicks the button,
                Modal will pop up otherwise it will not pop up, and we can’t see
                it. So, now we import one more component and pass the Image and
                Text as a prop to that component. Also, by default Modal is
                always open, so we need to handle it our way. That is why we
                need the state which we can control, and ultimately we control
                the Modal.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    // marginLeft: 150,
  },
});
