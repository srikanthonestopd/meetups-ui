import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    const addToCart = (event) => {
        setCart((prev) => [...prev, event]);
        setNotification(`${event.name} added to cart!`);
        setTimeout(() => setNotification(null), 2000);
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, notification }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);