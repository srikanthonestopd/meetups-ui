import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { eventsData } from "../data"; // ✅ Import local data
import EventCard from "../components/EventCard";
import "../assets/styles.css";

const Events = () => {
    const [events, setEvents] = useState(eventsData); // ✅ Store event data in state

    const handleLike = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId ? { ...event, likes: Number(event.likes || 0) + 1 } : event
            )
        );
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                🎭 All Events
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard event={event} onLike={handleLike} /> {/* ✅ Pass `handleLike` function */}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Events;