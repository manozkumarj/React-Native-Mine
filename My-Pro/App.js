import React from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./redux/store";

import LoggedInNavigator from "./navigation/LoggedInNavigator";

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <LoggedInNavigator />
    </Provider>
  );
};

export default App;
