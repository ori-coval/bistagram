import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

const LoginForm = () => {
    const navigate = useNavigate();
    const [, setCookies] = useCookies(["access"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = () => {
        axios
            .post("http://85.65.146.6:9512/login", {
                username: username,
                password: password,
            }, { headers: {
                accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            }})
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
            <label htmlFor="username">Username</label><br />
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={submitLogin}>Login</button><br />
        </div>
    );
};

export default LoginForm;
