import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitSignup = () => {
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
      });
  };
  return (
    <div>
      <SignupForm setUsername={setUsername} setPassword={setPassword} submitSignup={submitSignup} />
    </div>
  );
};

export default SignupPage;
