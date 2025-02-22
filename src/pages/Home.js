import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles.css"; // Import global styles

const Home = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from the backend
    useEffect(() => {
        axios.get("http://localhost:5001/events")
            .then((response) => setEvents(response.data))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

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
                    <div className="hero-buttons">
                        <Button variant="contained" color="primary" size="large" component={Link} to="/events">
                            View All Events
                        </Button>
                        <Button variant="outlined" color="secondary" size="large" component={Link} to="/register">
                            Sign Up Now
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Upcoming Events Section */}
            <Container className="featured-events">
                <Typography variant="h4" gutterBottom align="center">
                    🎭 Upcoming Events
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {events.slice(0, 3).map((event) => ( // Show only 3 events
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Card className="event-card">
                                <CardMedia component="img" height="200" image={event.image} alt={event.name} />
                                <CardContent>
                                    <Typography variant="h5">{event.name}</Typography>
                                    <Typography variant="subtitle1">📅 {event.date}</Typography>
                                    <Button variant="contained" color="primary" component={Link} to={`/events/${event.id}`}>
                                        Book Now
                                    </Button>
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