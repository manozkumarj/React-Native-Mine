import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  ScrollView,
  Image,
  Text,
  StyleSheet,
} from "react-native";

const DisplayModal = (props) => {
  const handleClose = () => {
    // setVisible(false);
    props.closeModal();
  };

  return (
    <Modal
      visible={props.display}
      animationType="slide"
      transparent={false}
      onRequestClose={() => console.log("closed")}
      onDismiss={() => console.log("dismissed")}
      presentationStyle="fullScreen"
    >
      <ScrollView>
        <Image source={props.image} style={styles.image} />
        <Text style={styles.text}>{props.data}</Text>

        <Button title="Click To Close Modal" onPress={handleClose} />

        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={styles.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    // marginLeft: 150,
  },
});

export default DisplayModal;
