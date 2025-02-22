import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // ✅ Import Cookies
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const user = JSON.parse(localStorage.getItem("user"));
    const [totalPrice, setTotalPrice] = useState(Cookies.get("totalPrice") || "0.00");

    // ✅ Update total price when cart changes
    useEffect(() => {
        const TAX_RATE = 0.085;
        const SERVICE_FEE = 0.015;

        // ✅ Group cart items by event ID and calculate total
        const eventQuantities = cart.reduce((acc, event) => {
            if (!acc[event.id]) {
                acc[event.id] = { ...event, quantity: 1 };
            } else {
                acc[event.id].quantity += 1;
            }
            return acc;
        }, {});

        const uniqueCart = Object.values(eventQuantities);
        const subtotal = uniqueCart.reduce((total, event) => total + event.price * event.quantity, 0);
        const tax = subtotal * TAX_RATE;
        const serviceFee = subtotal * SERVICE_FEE;
        const total = subtotal + tax + serviceFee;

        // ✅ Store updated total in cookies & state
        Cookies.set("totalPrice", total.toFixed(2), { expires: 1 });
        setTotalPrice(total.toFixed(2));
    }, [cart]); // ✅ Update when cart changes

    const handleLogout = () => {
        localStorage.removeItem("user");
        Cookies.remove("totalPrice"); // ✅ Clear Price on Logout
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>🎟️ TicketMaster</Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/events">Events</Button>

                {user ? (
                    <>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Hi, {user.name}! 👋
                        </Typography>
                        {/* ✅ Clickable Total Price that redirects to Checkout */}
                        {totalPrice > 0 && (
                            <Button
                                onClick={() => navigate("/checkout")}
                                sx={{ marginRight: 2, color: "#FFD700", fontWeight: "bold", cursor: "pointer" }}
                            >
                                🛒 Total: ${totalPrice}
                            </Button>
                        )}
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;