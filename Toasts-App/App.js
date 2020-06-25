import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-tiny-toast";

export default class App extends Component {
  showDefault = () => {
    Toast.show("This is a default toast", { duration: 1000 });
  };

  showSuccess = () => {
    Toast.showSuccess("Pay Success", { duration: 1000 });
  };

  showLoading = () => {
    const toast = Toast.showLoading("Loading, Please wait...");
    setTimeout(() => {
      // recommend
      Toast.hide(toast);
      // If you don't pass toast，it will hide the last toast by default.
      // Toast.hide()
    }, 3000);
  };

  showCustom = () => {
    Toast.show("custom toast", {
      containerStyle: {
        // backgroundColor: "rgba(220,220,221,.80)",
        backgroundColor: "red",
        paddingHorizontal: 15,
        borderRadius: 20,
      },
      textColor: "#fff",
      duration: 1000,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionView}
          activeOpacity={0.8}
          onPress={this.showDefault}
        >
          <Text style={styles.actionText}>Default show</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionView}
          activeOpacity={0.8}
          onPress={this.showSuccess}
        >
          <Text style={styles.actionText}>Default showSuccess</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionView}
          activeOpacity={0.8}
          onPress={this.showLoading}
        >
          <Text style={styles.actionText}>Default showLoading</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionView}
          activeOpacity={0.8}
          onPress={this.showCustom}
        >
          <Text style={styles.actionText}>Cutom toast</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  actionView: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#6574CD",
  },
  actionText: {
    fontSize: 20,
    color: "#fff",
  },
});
