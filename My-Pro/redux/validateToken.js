import { jwt } from "react-native-pure-jwt";
import { AsyncStorage } from "react-native";

const jwtSecret =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const validateToken = async () => {
  // Get the token from header
  const tempToken = await AsyncStorage.getItem("authToken");
  console.log("tempToken -->" + tempToken);
  console.log(JSON.stringify(tempToken));

  // Check if not token
  if (!tempToken) {
    console.log("No token found, Authorization denied");
    return false;
  }

  if (!tempToken.includes("@@")) {
    console.log("Token is not valid, Authorization denied");
    return false;
  }
  let splitToken = tempToken.split("@@");
  const token = splitToken[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // console.log(decoded.data);
    const userDetails = decoded.data;
    return userDetails;
  } catch (error) {
    console.log("Token is not valid, Authorization denied");
    // window.location.reload();
    return false;
  }
};

export default validateToken;
