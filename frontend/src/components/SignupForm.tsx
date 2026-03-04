import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupForm = ({
    setUsername,
    setPassword,
    submitSignup,
}: {
    setUsername: (arg: string) => void;
    setPassword: (arg: string) => void;
    submitSignup: () => void;
}) => {
    const navigate = useNavigate();
    return (
        <Stack direction="column">
            <TextField label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" onClick={submitSignup}>Signup</Button>
            <Button variant="text" onClick={() => { navigate("/login") }}>Already have an account?</Button>
        </Stack>
    );
};

export default SignupForm;
