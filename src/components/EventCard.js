import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
    <Card className="event-card">
        <CardMedia component="img" className="event-image" image={event.image} alt={event.name} />
        <CardContent className="event-content">
            <Typography variant="h5" className="event-title">{event.name}</Typography>
            <Typography variant="subtitle1" className="event-date">📅 {event.date}</Typography>

            {/* ✅ Properly Center the Button */}
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                    View Details
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default EventCard;