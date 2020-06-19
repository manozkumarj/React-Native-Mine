import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./redux/store";

import RootNavigator from "./navigation/RootNavigator";

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
