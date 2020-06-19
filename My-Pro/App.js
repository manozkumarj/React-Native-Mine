import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import RootNavigator from "./navigation/RootNavigator";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
