import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { Modalize } from "react-native-modalize";

const FbStyleModal = () => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const renderContent = () => [
    <View style={s.content__header} key="0">
      <Text style={s.content__heading}>Article title</Text>
      <Text style={s.content__subheading}>November 11st 2018</Text>
    </View>,

    <View style={s.content__inside} key="1">
      <Text style={s.content__paragraph}>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
      </Text>
      <Text style={[s.content__subheading, { marginTop: 30 }]}>
        Horizontal ScrollView
      </Text>

      <ScrollView style={s.content__scrollview} horizontal>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <View key={i} style={s.content__block} />
          ))}
      </ScrollView>

      <Text style={s.content__paragraph}>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
        <Text style={s.text}>
          So, here we have added one Button, and also, we have imported the
          image file. Right now, we have not used it yet, but we will use it in
          a minute. Our goal is when the user clicks the button, Modal will pop
          up otherwise it will not pop up, and we can’t see it. So, now we
          import one more component and pass the Image and Text as a prop to
          that component. Also, by default Modal is always open, so we need to
          handle it our way. That is why we need the state which we can control,
          and ultimately we control the Modal.
        </Text>
      </Text>

      <TextInput
        style={s.content__input}
        placeholder="Type your username"
        clearButtonMode="while-editing"
      />
    </View>,
  ];

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Button onPress={onOpen} title="Open Modal" color="orange"></Button>
      </TouchableOpacity>

      <Modalize
        ref={modalizeRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
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

export default FbStyleModal;
