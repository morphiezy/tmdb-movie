import Cookies from "js-cookie";

export default function SignIn() {
  return <h1>{Cookies.get("req_token")}</h1>;
}
