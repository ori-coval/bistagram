import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
    setUsername,
    setPassword,
    submitLogin,
}: {
    setUsername: (arg: string) => void;
    setPassword: (arg: string) => void;
    submitLogin: () => void;
}) => {
    const navigate = useNavigate();
    return (
        <Stack direction="column">
            <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" onClick={submitLogin}>Login</Button>
            <Button variant="text" onClick={() => { navigate("/signup") }}>Don't have an account?</Button>
        </Stack>
    );
};

export default LoginForm;
