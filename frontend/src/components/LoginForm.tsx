import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  setUsername,
  setPassword,
  submitLogin,
  loginError,
}: {
  setUsername: (arg: string) => void;
  setPassword: (arg: string) => void;
  submitLogin: () => void;
  loginError: string;
}) => {
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={2}>
      <TextField
        label="Username"
        variant="standard"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={submitLogin}>
        Login
      </Button>
      <Typography
        variant="body2"
        color="red"
        hidden={loginError !== "INVALID_CREDENTIALS"}
        sx={{ textAlign: "center" }}>
          Incorrect username or password.
      </Typography>
      <Button
        sx={{ width: 250 }}
        variant="text"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't have an account?
      </Button>
    </Stack>
  );
};

export default LoginForm;
