import React, { useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { eventsData } from "../data"; // ✅ Import local data
import "../assets/styles.css";

const Home = () => {
    const [events] = useState(eventsData);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <Container>
                    <Typography variant="h2" className="hero-title">
                        🎟️ Experience the Best Events!
                    </Typography>
                    <Typography variant="h5" className="hero-subtitle">
                        Concerts, Sports, Comedy & More - Book Your Tickets Now
                    </Typography>

                    {/* Button Container with Proper Spacing & Visibility */}
                    <Box className="hero-buttons">
                        <Button variant="contained" color="primary" size="large" component={Link} to="/events">
                            View All Events
                        </Button>
                        <Button variant="outlined" color="secondary" size="large" component={Link} to="/register">
                            Sign Up Now
                        </Button>
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
                                    <Typography variant="subtitle1" className="event-date">📅 {event.date}</Typography>
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                                            Book Now
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