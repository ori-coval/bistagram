import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";


const AnonymousLogin = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access"]);

  useEffect(() => {
    axios
      .post(
        BACKEND_URL + "/login",
        {
            username: "anonymous",
            password: "anonymous"
        },
        {
            headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        const token = response.data.access_token;
        const expires = new Date();
        expires.setHours(expires.getHours() + 12);
        setCookies("access", { token: token, expires: expires.toString() });
        navigate("home-page");
      })
  }, []);

  return (<></>);
};

export default AnonymousLogin;
