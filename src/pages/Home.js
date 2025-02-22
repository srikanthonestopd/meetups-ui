import React, { useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { eventsData } from "../data";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility'; // 👀 Icon for views
import PeopleIcon from '@mui/icons-material/People'; // 👥 Icon for attendees
import "../assets/styles.css";

const Home = () => {
    const [events, setEvents] = useState(eventsData);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLike = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId ? { ...event, likes: Number(event.likes || 0) + 1 } : event
            )
        );
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <Container>
                    {user ? (
                        <Typography variant="h2" className="hero-user">
                            Hi, {user.name}! 👋
                        </Typography>
                    ) : (
                        <Typography variant="h2" className="hero-title">
                            🎟️ Experience the Best Events!
                        </Typography>
                    )}

                    <Typography variant="h5" className="hero-subtitle">
                        Concerts, Sports, Comedy & More - Book Your Tickets Now
                    </Typography>

                    <Box className="hero-buttons">
                        <Button variant="contained" color="primary" size="large" component={Link} to="/events">
                            View All Events
                        </Button>
                        {!user && (
                            <Button variant="outlined" color="secondary" size="large" component={Link} to="/register">
                                Sign Up Now
                            </Button>
                        )}
                    </Box>
                </Container>
            </div>

            {/* Upcoming Events Section */}
            <Container className="featured-events">
                <Typography variant="h4" gutterBottom align="center">
                    🎭 Upcoming Events
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {events.slice(0, 3).map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Card className="event-card">
                                <CardMedia component="img" className="event-image" image={event.image} alt={event.name} />
                                <CardContent>
                                    <Typography variant="h5" className="event-title">{event.name}</Typography>

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

                                    {/* Like Button */}
                                    <Box display="flex" justifyContent="center" mt={1}>
                                        <Button startIcon={<FavoriteIcon />} variant="outlined" color="secondary" onClick={() => handleLike(event.id)}>
                                            Like
                                        </Button>
                                    </Box>

                                    {/* View Details Button */}
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                                            View Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Home;