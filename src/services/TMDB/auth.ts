import axios from "../client";
import Cookies from "js-cookie";
import type { AccessTokenResponse, RequestTokenResponse } from "@/types";

export const requestToken = async (): Promise<void> => {
  const response = await axios.post("/4/auth/request_token", {
    redirect_to: "http://localhost:5173",
  });

  if (response.status !== 200 || !response.data?.success) {
    throw new Error("Authentication failed");
  }

  const data: RequestTokenResponse = response.data;
  const token = data.request_token;
  const url = "https://www.themoviedb.org/auth/access?request_token=";

  sessionStorage.setItem("req_token", token);
  window.location.replace(url + token);
};

export const requestAccessToken = async (): Promise<AccessTokenResponse> => {
  const requestToken = window.sessionStorage.getItem("req_token") ?? undefined;

  if (!requestToken) throw new Error("Authentication failed");

  const response = await axios.post("/4/auth/access_token", {
    request_token: requestToken,
  });

  if (response.status !== 200 || !response.data?.success)
    throw new Error("Authentication failed");

  const data: AccessTokenResponse = response.data;

  Cookies.set(
    "session",
    JSON.stringify({
      token: data.access_token,
      account_id: data.account_id,
    }),
    { expires: 7 },
  );

  sessionStorage.removeItem("req_token");
  return data;
};

export const deleteSession = async (): Promise<void> => {
  const session = JSON.parse(String(Cookies.get("session")));
  const access_token = session.token;

  if (!access_token) throw new Error("Something went wrong");

  await axios.delete("/4/auth/access_token", { data: { access_token } });

  Cookies.remove("session");
  localStorage.removeItem("favorite");
  localStorage.removeItem("watchlist");
};
