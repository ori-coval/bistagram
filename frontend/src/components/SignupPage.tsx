import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Stack } from "@mui/material";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const submitSignup = () => {
    if (username.includes(" ") || password.includes(" ") || username.length === 0 || password.length === 0) {
      return;
    }
    axios
      .post(
        "http://85.65.146.6:9512/signup",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then((_) => {
        navigate("/login");
      })
      .catch((err) => {
        setSignupError(err.response.data.detail);
      })
  };
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: "97vh" }}>
      <SignupForm setUsername={setUsername} setPassword={setPassword} submitSignup={submitSignup} signupError={signupError} />
    </Stack>
  );
};

export default SignupPage;
