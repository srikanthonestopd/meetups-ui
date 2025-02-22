import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from "@mui/material";

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, event) => total + event.price, 0);

    const handleProceedToPayment = () => {
        navigate("/payment", { state: { totalAmount } });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>🛒 Checkout</Typography>
            {cart.length === 0 ? (
                <Typography>No tickets added.</Typography>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>${event.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>Total: ${totalAmount}</Typography>
                    <Box display="flex" gap={2} mt={3}>
                        <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
                            Proceed to Payment
                        </Button>
                        <Button variant="outlined" onClick={clearCart}>Cancel Order</Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CheckoutPage;