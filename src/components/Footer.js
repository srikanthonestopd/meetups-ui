import React from "react";
import { Container, Typography, Grid, Link, Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../assets/styles.css"; // ✅ Import global styles

const Footer = () => {
    return (
        <footer className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* ✅ Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Quick Links</Typography>
                        <ul className="footer-links">
                            <li><Link href="/" underline="none">Home</Link></li>
                            <li><Link href="/events" underline="none">Events</Link></li>
                            <li><Link href="/contact" underline="none">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" underline="none">Privacy Policy</Link></li>
                        </ul>
                    </Grid>

                    {/* ✅ Contact Details */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Contact Us</Typography>
                        <Box display="flex" alignItems="center">
                            <EmailIcon fontSize="small" className="footer-icon" />
                            <Typography variant="body2">support@meetups.com</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <PhoneIcon fontSize="small" className="footer-icon" />
                            <Typography variant="body2">+1 (480) 648-8123</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <LocationOnIcon fontSize="small" className="footer-icon" />
                            <Typography variant="body2">21620 N 19th Ave, Phoenix, AZ 85027</Typography>
                        </Box>
                    </Grid>

                    {/* ✅ Social Media */}
                    <Grid item xs={12} sm={4} className="footer-social">
                        <Typography variant="h6">Follow Us</Typography>
                        <IconButton href="https://facebook.com/onestopdsolutionsinc" target="_blank" color="primary">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://twitter.com" target="_blank" color="primary">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href="https://instagram.com/onestopdsolutionsinc" target="_blank" color="primary">
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                {/* ✅ Copyright */}
                <Box textAlign="center" mt={3}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} MeetUps. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;