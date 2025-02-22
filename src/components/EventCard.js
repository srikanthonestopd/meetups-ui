import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // 📅 Date Icon
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // 💰 Price Icon

const EventCard = ({ event, onLike }) => (
    <Card className="event-card">
        <CardMedia component="img" className="event-image" image={event.image} alt={event.name} />
        <CardContent className="event-content">
            <Typography variant="h5" className="event-title">{event.name}</Typography>

            {/* ✅ Professionally Styled Date & Price */}
            <Box className="event-details">
                <Typography variant="subtitle2" className="event-date">
                    <CalendarTodayIcon fontSize="small" /> {event.date}
                </Typography>
                <Typography variant="subtitle2" className="event-price">
                    <MonetizationOnIcon fontSize="small" /> ${event.price}
                </Typography>
            </Box>

            {/* ✅ Stats in One Line */}
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

            {/* ✅ Like Button */}
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    startIcon={<FavoriteIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => onLike(event.id)}
                >
                    Like
                </Button>
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                    View Details
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default EventCard;