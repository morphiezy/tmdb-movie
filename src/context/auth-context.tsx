import React from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@/types";
import { authReducer, authState } from "@/store/auth-reducer";
import {
  deleteSession,
  requestAccessToken,
  requestToken,
} from "@/services/TMDB/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | undefined;
  getRequestToken: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = React.useReducer(authReducer, authState);
  const navigate = useNavigate();

  const getRequestToken = async (): Promise<void> => {
    try {
      dispatch({ type: "AUTH_START" });
      await requestToken();
    } catch (error) {
      const message = (error as Error).message;
      toast.error(message);
      dispatch({ type: "AUTH_FAILED", error: message });
    }
  };

  const getAccessToken = async () => {
    try {
      dispatch({ type: "AUTH_START" });
      const data = await requestAccessToken();

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { account_id: data.account_id },
      });
    } catch (error) {
      dispatch({ type: "AUTH_FAILED", error: (error as Error).message });
      return Promise.reject("Authentication failed");
    }
  };

  const signOut = async () => {
    try {
      await deleteSession();
      dispatch({ type: "LOGOUT" });
      navigate("/", { replace: true });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  React.useEffect(() => {
    const requestToken = sessionStorage.getItem("req_token");

    if (requestToken) {
      toast.promise(getAccessToken, {
        loading: "Authenticating user...",
        success: () => `Login success, welcome to cinema`,
        error: (e) => e,
      });
    }
  }, []);

  React.useEffect(() => {
    const session = Cookies.get("session");

    if (session) {
      const user: Session = JSON.parse(session);

      user?.account_id &&
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { account_id: user.account_id },
        });
    }

    dispatch({ type: "AUTH_END" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        getRequestToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an AuthContextProvider");

  return context;
}
