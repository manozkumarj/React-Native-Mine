import React from "react";
import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";

export default class HorizontalFlatListScroll extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: "yellow",
          height: 150,
          width: Dimensions.get("screen").width - 100,
        }}
      >
        <Text>{item.key}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is sample content</Text>
        <FlatList
          data={[
            { key: 1 },
            { key: 2 },
            { key: 3 },
            { key: 4 },
            { key: 5 },
            { key: 6 },
            { key: 7 },
            { key: 8 },
            { key: 9 },
            { key: 10 },
          ]}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.key}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        />
        <Text style={styles.text}>This is sample content</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 200,
  },
  text: {
    padding: 25,
  },
});
