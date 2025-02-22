import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await axios.post("http://localhost:5001/auth/login", credentials);
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <Container>
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>

            {/* Add Register Link */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Don't have an account? <Link to="/register">Register Here</Link>
            </Typography>
        </Container>
    );
};

export default Login;