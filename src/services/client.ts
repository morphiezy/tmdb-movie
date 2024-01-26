import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_ENDPOINT_URI,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

try {
  const session = Cookies.get("session");
  const token = session && JSON.parse(session).token;

  if (token) {
    instance.defaults.headers["common"] = {
      Authorization: `Bearer ${token}`,
    };
  }
} catch (error) {
  console.log("failed to parse token");
}

export default instance;
