import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, CardMedia, Box } from "@mui/material";
import { useCart } from "../context/CartContext";
import { eventsData } from "../data";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const user = JSON.parse(localStorage.getItem("user"));

    const event = eventsData.find((e) => e.id === parseInt(id));

    if (!event) {
        return <Typography variant="h4">Event Not Found</Typography>;
    }

    const handleBuyTickets = () => {
        if (!user) {
            alert("Please log in to continue.");
            navigate("/login");
            return;
        }

        for (let i = 0; i < quantity; i++) {
            addToCart(event);
        }
        navigate("/checkout");
    };

    return (
        <Container className="event-details-container">
            <CardMedia component="img" className="event-details-image" image={event.image} alt={event.name} />
            <Typography variant="h3">{event.name}</Typography>
            <Typography variant="h5">📅 {event.date}</Typography>
            <Typography variant="h6">💰 ${event.price}</Typography>

            <Box display="flex" flexDirection="column" alignItems="center" mt={2} width="100%">
                <TextField
                    label="Number of Tickets"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    sx={{ width: "200px", textAlign: "center", marginBottom: "15px" }}
                />

                <Button variant="contained" color="primary" onClick={handleBuyTickets}>
                    Buy {quantity} Ticket(s)
                </Button>
            </Box>
        </Container>
    );
};

export default EventDetails;