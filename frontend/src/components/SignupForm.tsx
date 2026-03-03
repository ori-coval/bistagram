import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitSignup = () => {
        axios
            .post("http://85.65.146.6:9512/signup", {
                username: username,
                password: password,
            }, { headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            }})
            .then((_) => {
                navigate("/login");
            });
    };

    return (
        <div>
            <label htmlFor="username">Username</label><br />
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={submitSignup}>Signup</button><br />
        </div>
    );
};

export default SignupForm;
