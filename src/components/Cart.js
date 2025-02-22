import React from "react";
import { useCart } from "../context/CartContext";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography, Grow } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart } = useCart();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>
            {cart.length === 0 ? (
                <Typography>No tickets added.</Typography>
            ) : (
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
                            <Grow in={true} key={index} timeout={500}>
                                <TableRow>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>${event.price}</TableCell>
                                </TableRow>
                            </Grow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {cart.length > 0 && (
                <>
                    <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
                        <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}>Proceed to Checkout</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to="/events" style={{ textDecoration: "none" }}>Back to Events</Link>
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;