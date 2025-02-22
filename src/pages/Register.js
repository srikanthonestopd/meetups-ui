import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

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
        <Container>
            <Typography variant="h4">Register</Typography>
            <TextField label="Name" fullWidth margin="normal" onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <TextField label="Email" fullWidth margin="normal" onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default Register;