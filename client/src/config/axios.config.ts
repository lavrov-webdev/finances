import axios from "axios";
export const appAxios = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000" : "https://finances.lavrov.space/api",
  withCredentials: true,
});
