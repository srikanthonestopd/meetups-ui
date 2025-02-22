import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { useCart } from "../context/CartContext";
import { generateTicketID } from "../utils/TicketUtils";
import BarcodeGenerator from "../components/BarcodeGenerator";



const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart, cart } = useCart();
    const totalAmount = location.state?.totalAmount || 0;

    const [paymentInfo, setPaymentInfo] = useState({
        fullName: "",
        billingAddress: "",
        phoneNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const [ticket, setTicket] = useState(null);

    const handlePayment = () => {
        if (!paymentInfo.fullName || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        const ticketDetails = {
            id: generateTicketID(),
            name: paymentInfo.fullName,
            events: cart,
            total: totalAmount,
            date: new Date().toLocaleDateString()
        };

        setTicket(ticketDetails);
        clearCart();
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container>
            {!ticket ? (
                <>
                    <Typography variant="h4" gutterBottom>💳 Payment</Typography>
                    <Typography variant="h5">Total Amount: ${totalAmount}</Typography>

                    <TextField fullWidth label="Full Name" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, fullName: e.target.value })} />
                    <TextField fullWidth label="Billing Address" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, billingAddress: e.target.value })} />
                    <TextField fullWidth label="Phone Number" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, phoneNumber: e.target.value })} />
                    <TextField fullWidth label="Card Number" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} />
                    <TextField fullWidth label="Expiry Date (MM/YY)" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })} />
                    <TextField fullWidth label="CVV" type="password" margin="normal" onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} />

                    <Box mt={3}>
                        <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
                            Pay Now
                        </Button>
                    </Box>
                </>
            ) : (
                <Paper elevation={3} className="ticket-container">
                    <Typography variant="h4" gutterBottom>🎟️ Your Ticket</Typography>
                    <Typography variant="h5">Ticket ID: {ticket.id}</Typography>
                    <Typography variant="h6">Name: {ticket.name}</Typography>
                    <Typography variant="h6">Date: {ticket.date}</Typography>
                    <Typography variant="h6">Total: ${ticket.total}</Typography>

                    {ticket.events.map((event, index) => (
                        <Box key={index} sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">{event.name}</Typography>
                            <Typography>📅 {event.date}</Typography>
                            <Typography>💰 ${event.price}</Typography>
                        </Box>
                    ))}

                    {/* ✅ Generate Barcode Based on Ticket ID */}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <BarcodeGenerator value={ticket.id} />
                    </Box>

                    <Button variant="contained" color="primary" onClick={handlePrint} sx={{ marginTop: 2 }}>
                        Print Ticket
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ marginLeft: 2, marginTop: 2 }}>
                        Send to Email
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default PaymentPage;