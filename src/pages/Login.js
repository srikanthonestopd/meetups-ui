import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Paper } from "@mui/material";
import "../assets/styles.css"; // Import global styles

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
        <div className="auth-container login-bg">
            <Paper className="auth-box">
                <Typography variant="h4" className="auth-title">Login</Typography>
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
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin} className="auth-button">
                    Login
                </Button>
                <Typography variant="body1" className="auth-footer">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </Typography>
            </Paper>
        </div>
    );
};

export default Login;