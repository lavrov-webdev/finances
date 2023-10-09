import axios from "axios";
export const appAxios = axios.create({
  baseURL: "https://finances.lavrov.space/api",
  withCredentials: true,
});
