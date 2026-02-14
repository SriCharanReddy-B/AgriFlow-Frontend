import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. THE UPGRADE: When the app loads, check the browser's hard drive first!
    const cartFromStorage = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];

    // Start the state with the saved data (or empty if nothing is saved)
    const [cartItems, setCartItems] = useState(cartFromStorage);

    // 2. THE UPGRADE: Whenever the cart changes, automatically save it to Local Storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            setCartItems(cartItems.map((x) => x._id === existItem._id ? product : x));
        } else {
            setCartItems([...cartItems, product]);
        }

        console.log("Item added to cart and saved to storage!", product.name);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};