import axios from "axios";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setCookies] = useCookies(["access"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    axios
      .post(
        "http://85.65.146.6:9512/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((response) => {
        const token = response.data.access_token;
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        setCookies("access", { token: token, expires: expires.toString() });
        navigate("/home-page");
      });
  };

  return (
    <div>
      <LoginForm setUsername={setUsername} setPassword={setPassword} submitLogin={submitLogin} />
    </div>
  );
};

export default LoginPage;
