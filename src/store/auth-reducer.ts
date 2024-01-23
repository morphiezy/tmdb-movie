import { User } from "@/types";

type AuthActionType =
  | { type: "AUTH_START" }
  | { type: "AUTH_END" }
  | { type: "AUTH_FAILED"; error: string }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "LOGOUT" };

interface State {
  user: User | null;
  loading: boolean;
  error: undefined | string;
}

export const authState: State = {
  user: null,
  loading: true,
  error: undefined,
};

export function authReducer(state: State, action: AuthActionType) {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true };
    case "AUTH_END":
      return { ...state, loading: false };
    case "AUTH_FAILED":
      return { ...state, loading: false, error: action.error };
    case "AUTH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: undefined,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...authState, loading: false };
    default:
      return state;
  }
}
