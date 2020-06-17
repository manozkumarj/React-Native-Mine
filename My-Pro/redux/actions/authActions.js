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
  AsyncStorage.removeItem("authToken");
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN });
  };
};

export const getAuthState = () => {
  const userToken = AsyncStorage.getItem("authToken");
  return (dispatch) => {
    dispatch({ type: AUTH_STATE, payload: userToken });
  };
};
