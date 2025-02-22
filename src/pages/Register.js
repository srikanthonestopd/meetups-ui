import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Paper } from "@mui/material";
import "../assets/styles.css"; // Import global styles

const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const { data } = await axios.post("http://localhost:5001/auth/register", user);
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-container register-bg">
            <Paper className="auth-box">
                <Typography variant="h4" className="auth-title">Sign Up</Typography>
                <TextField
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleRegister} className="auth-button">
                    Sign Up
                </Button>
                <Typography variant="body1" className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Paper>
        </div>
    );
};

export default Register;