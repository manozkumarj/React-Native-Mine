import API from "./../../api";
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "./../actionTypes/registerAccountTypes";
import { AsyncStorage } from "react-native";

export const registerAccount = (accountDetails) => {
  console.log(accountDetails);

  // API.get(`users`)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  // let { fullName, email, password } = accountDetails;

  const headers = {
    "Content-Type": "application/json",
  };

  return (dispatch) => {
    return API.post(`users`, accountDetails, { headers })
      .then((res) => {
        console.log(res.data);
        AsyncStorage.setItem("authToken", res.data.token);
        dispatch({ type: REGISTRATION_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REGISTRATION_FAILED, payload: err.response.data.msg });
      });
  };
};
