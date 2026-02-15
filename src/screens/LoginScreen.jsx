import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Pull the login function from our Global Auth Cloud
  const { login } = useContext(AuthContext); 
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = async (e) => {
    e.preventDefault(); 
    
    try {
      // 2. Send the email and password to your Node Backend
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/users/login', { email, password }, config);
      
      // 3. If successful, push the user data (including the JWT token) into the Cloud
      login(data);
      
      // 4. Redirect them to the checkout page (or homepage)
      navigate(`/${redirect}`);
      
    } catch (err) {
      // If the backend sends back an error (like 401 Unauthorized)
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#2E7D32', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign In
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        New Customer? <Link to={`/register?redirect=${redirect}`} style={{ color: '#2E7D32' }}>Register Here</Link>
      </div>
    </div>
  );
};

export default LoginScreen;