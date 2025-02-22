import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { TextField, Button, Container, Typography } from "@mui/material";

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", cvv: "" });

    const handlePayment = async () => {
        try {
            await axios.post("http://localhost:5001/payments", {
                tickets: cart,
                payment: paymentInfo,
            });
            alert("✅ Payment Successful!");
            clearCart();
        } catch (error) {
            alert("❌ Payment Failed");
        }
    };

    return (
        <Container>
            <Typography variant="h4">💳 Checkout</Typography>
            <TextField
                fullWidth
                label="Card Number"
                margin="normal"
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            />
            <TextField
                fullWidth
                label="CVV"
                margin="normal"
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handlePayment}>Pay Now</Button>
        </Container>
    );
};

export default Checkout;