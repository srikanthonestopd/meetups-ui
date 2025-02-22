import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { eventsData } from "../data"; // ✅ Import local data
import EventCard from "../components/EventCard";
import "../assets/styles.css"; // ✅ Import CSS

const Events = () => {
    const [events] = useState(eventsData);

    return (
        <Container className="events-container">
            <Typography variant="h4" gutterBottom align="center">
                🎭 All Events
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Events;