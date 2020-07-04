import {
  SET_TOKEN,
  REMOVE_TOKEN,
  AUTH_STATE,
} from "./../actionTypes/authTypes";
import { AsyncStorage } from "react-native";

export const setToken = (token) => {
  AsyncStorage.setItem("authToken", token);
  return (dispatch) => {
    dispatch({ type: SET_TOKEN, payload: token });
  };
};

export const removeToken = () => {
  console.log("Removing authToken...");
  return async (dispatch) => {
    let remover = await AsyncStorage.removeItem("authToken");
    dispatch({ type: REMOVE_TOKEN });
    return { status: "success", msg: "Token removed" };
  };
};

export const getAuthState = () => {
  const userToken = AsyncStorage.getItem("authToken");
  return (dispatch) => {
    dispatch({ type: AUTH_STATE, payload: userToken });
  };
};
