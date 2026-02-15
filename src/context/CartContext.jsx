import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Check the browser's hard drive first!
    const cartFromStorage = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];

    // Start the state with the saved data
    const [cartItems, setCartItems] = useState(cartFromStorage);

    // 2. Automatically save it to Local Storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // 3. Add to Cart Logic
    const addToCart = (product) => {
        const existItem = cartItems.find((x) => x._id === product._id);

        if (existItem) {
            setCartItems(cartItems.map((x) => x._id === existItem._id ? product : x));
        } else {
            setCartItems([...cartItems, product]);
        }
        console.log("Item added to cart and saved to storage!", product.name);
    };

    // 4. THE MISSING PIECE: Remove from Cart Logic!
    const removeFromCart = (id) => {
        // This filters out the item we want to delete, keeping the rest
        setCartItems(cartItems.filter((x) => x._id !== id));
        console.log("Item removed from cart!");
    };

    return (
        // 5. EXPOSE IT TO THE APP
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};