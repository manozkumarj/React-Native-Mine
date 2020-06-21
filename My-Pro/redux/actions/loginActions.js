import API from "./../../api";
import { LOGIN_SUCCESS, LOGIN_FAILED } from "./../actionTypes/loginTypes";
import { AsyncStorage } from "react-native";

export const loginUser = (loginDetails) => {
  console.log(loginDetails);

  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    return API.post(`users/authenticate`, loginDetails, { headers })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.setItem("authToken", res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        return { status: "success", msg: "Login success" };
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
        return new Error(err.response.data.msg);
      });
  };
};
