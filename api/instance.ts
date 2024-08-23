import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export default instance;
