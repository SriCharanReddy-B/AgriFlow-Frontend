import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
  // 1. Pull the data and functions from the Global Cloud
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 2. Calculate the total price dynamically
  // .reduce loops through the cart and adds up all the prices
  const totalPrice = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);

  // 3. The Checkout Gateway (Day 15 prep)
  const checkoutHandler = () => {
    // For now, we will just alert. Later, this redirects to Login!
    alert('Proceeding to Checkout...');
    navigate('/login?redirect=checkout');
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div style={{ flex: 2, minWidth: '300px' }}>
        <h1>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/">Go Back</Link></p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* Later we can add item.image here */}
                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 'bold' }}>
                    {item.name}
                  </Link>
                </div>
                <div>₹{item.price}</div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  🗑️ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ flex: 1, minWidth: '250px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
        <h2>Order Summary</h2>
        <p><strong>Total Items:</strong> {cartItems.length}</p>
        <hr />
        <h3>Total Price: ₹{totalPrice}</h3>
        
        <button 
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
          style={{ width: '100%', padding: '15px', backgroundColor: cartItems.length === 0 ? '#ccc' : '#2E7D32', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;