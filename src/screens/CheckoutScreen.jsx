import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutScreen = () => {
  // Local state for the shipping form
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // Later, we will save this to our Global Cloud and move to a Payment screen
    console.log("Shipping to:", address, city, postalCode);
    alert("Address saved! Moving to Payment...");
    // navigate('/payment'); <-- We will build this next week!
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Shipping Address</h1>
      
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Address</label>
          <input 
            type="text" 
            placeholder="Enter address (e.g., 123 Farm Lane)" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label>City</label>
          <input 
            type="text" 
            placeholder="Enter city" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label>Postal Code</label>
          <input 
            type="text" 
            placeholder="Enter postal code" 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#2E7D32', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutScreen;