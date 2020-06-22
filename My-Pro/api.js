import axios from "axios";

const myPhone = "192.168.43.22";
// const broPhone = "192.168.43.23";

export default axios.create({
  baseURL: `http://${myPhone}:8088/api/`,
});
