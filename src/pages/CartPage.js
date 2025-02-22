import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cart, clearCart } = useCart();

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
                            <TableRow key={index}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>${event.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {cart.length > 0 && (
                <>
                    <Button variant="contained" color="secondary" component={Link} to="/checkout">
                        Proceed to Checkout
                    </Button>
                    <Button variant="outlined" onClick={clearCart} sx={{ marginLeft: 2 }}>
                        Clear Cart
                    </Button>
                </>
            )}
        </Container>
    );
};

export default CartPage;