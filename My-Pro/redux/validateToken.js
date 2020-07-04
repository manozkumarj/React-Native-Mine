import JWT from "expo-jwt";
import { AsyncStorage } from "react-native";

const jwtSecret =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const validateToken = async () => {
  // Get the token from header
  const tempToken = await AsyncStorage.getItem("authToken");
  // console.log("tempToken -->" + tempToken);
  // console.log(JSON.stringify(tempToken));

  // Check if not token
  if (!tempToken) {
    console.log("No token found, Authorization denied");
    return false;
  }

  if (!tempToken.includes("@@")) {
    console.log("Token is not valid, Authorization denied - 1");
    return false;
  }
  let splitToken = tempToken.split("@@");
  const token = splitToken[1];

  try {
    const decoded = JWT.decode(token, jwtSecret);

    // console.log(decoded.data);
    const userDetails = decoded.data;
    return userDetails;
  } catch (error) {
    console.log("Token is not valid, Authorization denied - 2");
    // window.location.reload();
    return false;
  }
};

export default validateToken;
