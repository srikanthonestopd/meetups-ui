import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, TextField, CircularProgress, CardMedia } from "@mui/material";
import { useCart } from "../context/CartContext";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:5001/events/${id}`)
            .then((response) => setEvent(response.data))
            .catch(() => console.error("Event not found"));
    }, [id]);

    const handleAddToCart = () => {
        if (quantity < 1) return;
        const tickets = Array(quantity).fill(event);
        tickets.forEach((ticket) => addToCart(ticket));
        navigate("/cart");
    };

    if (!event) return <CircularProgress />;

    return (
        <Container className="container">
            <CardMedia
                component="img"
                height="300"
                image={event.image}
                alt={event.name}
            />
            <Typography variant="h3" sx={{ marginTop: 2 }}>{event.name}</Typography>
            <Typography variant="h5">📅 {event.date}</Typography>
            <Typography variant="h6">💰 ${event.price}</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>{event.description}</Typography>

            <TextField
                label="Number of Tickets"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                sx={{ marginTop: 2, marginBottom: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleAddToCart}>
                Add {quantity} Ticket(s) to Cart
            </Button>
        </Container>
    );
};

export default EventDetails;