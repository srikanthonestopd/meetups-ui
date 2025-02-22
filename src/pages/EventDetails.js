import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, CardMedia, Box } from "@mui/material";
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context
import { eventsData } from "../data"; // ✅ Use hardcoded events

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const event = eventsData.find((e) => e.id === parseInt(id));

    if (!event) {
        return <Typography variant="h4">Event Not Found</Typography>;
    }

    const handleBuyTickets = () => {
        if (quantity < 1) return;
        for (let i = 0; i < quantity; i++) {
            addToCart(event); // ✅ Adds multiple tickets to cart
        }
        navigate("/cart"); // ✅ Redirects user to cart page
    };

    return (
        <Container className="event-details-container">
            <CardMedia component="img" className="event-details-image" image={event.image} alt={event.name} />
            <Typography variant="h3" className="event-title">{event.name}</Typography>
            <Typography variant="h5">📅 {event.date}</Typography>
            <Typography variant="h6">💰 ${event.price}</Typography>

            {/* Centered Description */}
            <Box className="event-description-box">
                <Typography variant="body1" className="event-description">
                    {event.description}
                </Typography>
            </Box>

            {/* Ticket Quantity & Buy Button */}
            <Box display="flex" flexDirection="column" alignItems="center" mt={2} width="100%">
                <TextField
                    label="Number of Tickets"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    sx={{ width: "200px", textAlign: "center", marginBottom: "15px" }} // ✅ Centers input box
                />

                <Button variant="contained" color="primary" onClick={handleBuyTickets} className="buy-button">
                    Buy {quantity} Ticket(s)
                </Button>
            </Box>
        </Container>
    );
};

export default EventDetails;