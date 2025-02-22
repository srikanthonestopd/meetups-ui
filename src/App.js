import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Import Register Page
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* ✅ Register Route */}
                    <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
                    <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;