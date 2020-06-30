import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

const ContentHeightModal = (props) => {
  const modalizeRef = useRef(null);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (props.display) onOpen();
  }, [props.display]);

  const onOpen = () => {
    modalizeRef.current?.open();
    console.log("onOpen func triggered");
  };

  const handleClose = () => {
    if (modalizeRef.current) {
      modalizeRef.current.close();
      props.closeModal();
    }
    console.log("handleClose func triggered");
  };

  const renderContent = () => (
    <View style={s.content}>
      <Text style={s.content__subheading}>{"Last step".toUpperCase()}</Text>
      <Text style={s.content__heading}>Send the message?</Text>
      <Text style={s.content__description}>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button
        </Text>
      </Text>

      <TouchableOpacity
        style={s.content__description}
        activeOpacity={0.75}
        onPress={() => setToggle(!toggle)}
      >
        <Text>adjustToContentHeight {JSON.stringify(toggle)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={s.content__button}
        activeOpacity={0.75}
        onPress={handleClose}
      >
        <Text style={s.content__buttonText}>{"Send".toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={toggle}
        onClosed={handleClose}
      >
        {renderContent()}
      </Modalize>
    </>
  );
};

const s = StyleSheet.create({
  content__header: {
    padding: 15,
    paddingBottom: 0,

    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: "#ccc",
  },

  content__inside: {
    padding: 15,
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },

  content__scrollview: {
    marginVertical: 20,
  },

  content__block: {
    width: 200,
    height: 80,

    marginRight: 20,

    backgroundColor: "#ccc",
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 10,

    width: "100%",

    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#cdcdcd",
    borderRadius: 6,
  },

  text: {
    fontSize: 20,
    paddingHorizontal: 20,
    // marginLeft: 150,
  },
});

export default ContentHeightModal;
