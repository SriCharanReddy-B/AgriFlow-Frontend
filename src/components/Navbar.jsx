import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // <--- 1. Import the Cloud

const Navbar = () => {
    // 2. Pull the cart data out of the Cloud
    const { cartItems } = useContext(CartContext);

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        backgroundColor: '#2E7D32',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '30px',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'color 0.3s'
    };

    const brandStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '24px',
        fontWeight: '800',
        letterSpacing: '1px'
    };

    return (
        <header style={navStyle}>
            <div>
                <Link to="/" style={brandStyle}>
                    🌾 AgriFlow
                </Link>
            </div>

            <nav>
                {/* 3. Make the Cart text dynamic! */}
                <Link to="/cart" style={linkStyle}>
                    🛒 Cart {cartItems.length > 0 && <span style={{ backgroundColor: 'white', color: '#2E7D32', padding: '2px 8px', borderRadius: '10px', marginLeft: '5px' }}>{cartItems.length}</span>}
                </Link>
                <Link to="/login" style={linkStyle}>👤 Sign In</Link>
            </nav>
        </header>
    );
};

export default Navbar;