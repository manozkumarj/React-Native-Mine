import React, { Component } from "react";
import zuck from "./assets/images/zuck.jpg";
import { View, Button, StyleSheet } from "react-native";
import DisplayModal from "./components/DisplayModal";

export default class App extends Component {
  state = {
    display: false,
  };

  triggerModal() {
    this.setState((prevState) => {
      return {
        display: true,
      };
    });
  }

  offModal() {
    this.setState({ display: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.triggerModal()}
          title="Open Modal"
          color="orange"
        ></Button>
        <DisplayModal
          image={zuck}
          data="Krunal"
          closeModal={() => this.offModal()}
          display={this.state.display}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
  },
});
