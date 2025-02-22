import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, CardMedia, Box, Grid, Card, CardContent } from "@mui/material";
import { useCart } from "../context/CartContext";
import { eventsData } from "../data";
import Cookies from "js-cookie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import "../assets/styles.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [event, setEvent] = useState(null);
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [cartAnimation, setCartAnimation] = useState(false);
    const TAX_RATE = 0.085;
    const SERVICE_FEE = 0.015;

    useEffect(() => {
        const foundEvent = eventsData.find((e) => e.id === parseInt(id));
        if (foundEvent) {
            foundEvent.views += 1;
            setEvent({ ...foundEvent });
        }

        const topEvents = eventsData
            .filter(e => e.id !== parseInt(id))
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

        setRecommendedEvents(topEvents);
    }, [id]);

    if (!event) {
        return <Typography variant="h4">Event Not Found</Typography>;
    }

    const handleBuyTickets = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(event);
        }
        setEvent((prev) => ({ ...prev, attendees: prev.attendees + quantity }));

        const subtotal = event.price * quantity;
        const tax = subtotal * TAX_RATE;
        const serviceFee = subtotal * SERVICE_FEE;
        const total = subtotal + tax + serviceFee;

        Cookies.set("totalPrice", total.toFixed(2), { expires: 1 });

        setCartAnimation(true);
        setTimeout(() => {
            setCartAnimation(false);
            navigate("/checkout");
        }, 1000);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <CardMedia component="img" className="event-details-image" image={event.image} alt={event.name} />

                    <Box className="pricing-details">
                        <Typography variant="h6">Subtotal: ${event.price * quantity}</Typography>
                        <Typography variant="h6">Tax (8.5%): ${(event.price * quantity * TAX_RATE).toFixed(2)}</Typography>
                        <Typography variant="h6">Service Fee (1.5%): ${(event.price * quantity * SERVICE_FEE).toFixed(2)}</Typography>
                        <Typography variant="h5" className="total-price">Total: ${(event.price * quantity * (1 + TAX_RATE + SERVICE_FEE)).toFixed(2)}</Typography>
                        <TextField
                            label="Number of Tickets"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            variant="outlined"
                            size="small"
                            className="quantity-input"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBuyTickets}
                            className={cartAnimation ? "cart-animating" : ""}
                            startIcon={<ShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                    </Box>




                </Grid>

                {/* ✅ Recommended Events */}
                <Grid item xs={12} md={4}>
                    <div className="recommendation-section">
                        <Typography variant="h6" gutterBottom>🔥 Top 3 Recommended Events</Typography>
                        {recommendedEvents.map((recEvent) => (
                            <Card key={recEvent.id} className="recommendation-card">
                                <CardMedia component="img" height="140" image={recEvent.image} alt={recEvent.name} />
                                <CardContent>
                                    <Typography variant="h6">{recEvent.name}</Typography>


                                        <Box className="event-stats">
                                            <Typography variant="subtitle1" display="flex" alignItems="center">
                                                <VisibilityIcon fontSize="small" /> {event.views}
                                            </Typography>
                                            <Typography variant="subtitle1" display="flex" alignItems="center">
                                                <FavoriteIcon fontSize="small" /> {event.likes}
                                            </Typography>
                                            <Typography variant="subtitle1" display="flex" alignItems="center">
                                                <PeopleIcon fontSize="small" /> {event.attendees}
                                            </Typography>
                                        </Box>
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

export default EventDetails;