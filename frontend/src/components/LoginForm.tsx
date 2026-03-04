const LoginForm = ({
    setUsername,
    setPassword,
    submitLogin,
}: {
    setUsername: (arg: string) => void;
    setPassword: (arg: string) => void;
    submitLogin: () => void;
}) => {
    return (
        <div>
            <label htmlFor="username">Username</label><br />
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} /><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={submitLogin}>Login</button><br />
        </div>
    );
};

export default LoginForm;
