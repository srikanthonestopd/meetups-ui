import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
    <Card sx={{ maxWidth: 345, margin: "20px", boxShadow: 3 }} className="event-card">
        <CardMedia
            component="img"
            height="200"
            image={event.image}
            alt={event.name}
        />
        <CardContent>
            <Typography variant="h5" gutterBottom>{event.name}</Typography>
            <Typography variant="subtitle1">📅 {event.date}</Typography>
            <Typography variant="h6">💰 ${event.price}</Typography>
            <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                View Details
            </Button>
        </CardContent>
    </Card>
);

export default EventCard;