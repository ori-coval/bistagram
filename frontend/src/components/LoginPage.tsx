import axios from "axios";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

const LoginPage = ({ nextPage }: { nextPage: string }) => {
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
        expires.setHours(expires.getHours() + 12);
        setCookies("access", { token: token, expires: expires.toString() });
        navigate(nextPage);
      });
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: "97vh" }}>
      <LoginForm setUsername={setUsername} setPassword={setPassword} submitLogin={submitLogin} />
    </Stack>
  );
};

export default LoginPage;
