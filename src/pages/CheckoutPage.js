import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, TextField, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { eventsData } from "../data";
import { Link } from "react-router-dom";
import "../assets/styles.css";

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const TAX_RATE = 0.085;
    const SERVICE_FEE = 0.015;

    // ✅ Group Cart Items by Event ID (Prevent Duplicates)
    const eventQuantities = cart.reduce((acc, event) => {
        if (!acc[event.id]) {
            acc[event.id] = { ...event, quantity: 1 };
        } else {
            acc[event.id].quantity += 1;
        }
        return acc;
    }, {});

    const uniqueCart = Object.values(eventQuantities);

    // ✅ Calculate Total Price
    const subtotal = uniqueCart.reduce((total, event) => total + event.price * event.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const serviceFee = subtotal * SERVICE_FEE;
    const total = subtotal + tax + serviceFee;

    // ✅ Store Order in Cookies for Later & Redirect
    const handleContinueShopping = () => {
        Cookies.set("savedOrders", JSON.stringify(uniqueCart), { expires: 1 });
        navigate("/events");
    };

    // ✅ Fetch Top 3 Recommended Events
    useEffect(() => {
        const topEvents = eventsData.sort((a, b) => b.views - a.views).slice(0, 3);
        setRecommendedEvents(topEvents);
    }, []);

    return (
        <Container>
            <Grid container spacing={3}>
                {/* ✅ Checkout Section */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>🛒 Checkout</Typography>

                    {uniqueCart.length === 0 ? (
                        <Typography>No tickets added.</Typography>
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uniqueCart.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>{event.name}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={event.quantity}
                                                    inputProps={{ min: 1, readOnly: true }}
                                                    variant="outlined"
                                                    size="small"
                                                    className="quantity-input"
                                                />
                                            </TableCell>
                                            <TableCell>${event.price.toFixed(2)}</TableCell>
                                            <TableCell>${(event.price * event.quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* ✅ Pricing Details */}
                            <Box className="pricing-details">
                                <Typography variant="h6">Subtotal: ${subtotal.toFixed(2)}</Typography>
                                <Typography variant="h6">Tax (8.5%): ${tax.toFixed(2)}</Typography>
                                <Typography variant="h6">Service Fee (1.5%): ${serviceFee.toFixed(2)}</Typography>
                                <Typography variant="h5" className="total-price">Total: ${total.toFixed(2)}</Typography>
                            </Box>

                            <Box display="flex" gap={2} mt={3}>
                                <Button variant="contained" color="secondary" onClick={handleContinueShopping}>
                                    Continue Shopping
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => navigate("/payment")}>
                                    Proceed to Payment
                                </Button>
                                <Button variant="outlined" onClick={clearCart}>Clear Cart</Button>
                            </Box>
                        </>
                    )}
                </Grid>

                {/* ✅ Recommended Events Section */}
                <Grid item xs={12} md={4}>
                    <div className="recommendation-section">
                        <Typography variant="h5" gutterBottom>🔥 Top 3 Recommended Events</Typography>
                        {recommendedEvents.map((recEvent) => (
                            <Card key={recEvent.id} className="recommendation-card">
                                <CardMedia component="img" height="140" image={recEvent.image} alt={recEvent.name} />
                                <CardContent>
                                    <Typography variant="h6">{recEvent.name}</Typography>
                                    <Typography variant="subtitle2">👀 {recEvent.views} Views</Typography>
                                    <Button variant="contained" color="primary" fullWidth component={Link} to={`/events/${recEvent.id}`}>
                                        View Event
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;