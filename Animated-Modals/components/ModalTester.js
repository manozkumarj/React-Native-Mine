import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

const ModalTester = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 100 }}>
        <Button title="Show modal" onPress={toggleModal} />
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ModalTester;
