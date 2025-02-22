import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { usersData } from "../data"; // ✅ Import users data
import "../assets/styles.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Attempting login with:", credentials); // ✅ Debugging log

        const user = usersData.find(
            (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
        );

        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // ✅ Store user in local storage
            navigate("/");
        } else {
            alert("Invalid credentials! Please check your email and password.");
        }
    };

    return (
        <div className="auth-container login-bg">
            <Paper className="auth-box">
                <Typography variant="h4" className="auth-title">Login</Typography>
                <TextField label="Email" fullWidth margin="normal" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
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