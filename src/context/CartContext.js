import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (event) => {
        setCart((prev) => [...prev, event]); // ✅ Adds event to cart
    };

    const clearCart = () => setCart([]); // ✅ Clears cart after checkout

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);