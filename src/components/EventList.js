import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { useCart } from "../context/CartContext";
import { Grid, Container, Typography } from "@mui/material";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get("http://localhost:5001/events")
            .then((response) => setEvents(response.data))
            .catch((error) => console.error("Error fetching events", error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>🎟️ Upcoming Events</Typography>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard event={event} addToCart={addToCart} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EventList;