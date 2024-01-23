import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_ENDPOINT_URI,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export default instance;
