import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = () => {

    };

    return (
        <div>
            <label htmlFor="username">Username</label><br />
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={submitLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
