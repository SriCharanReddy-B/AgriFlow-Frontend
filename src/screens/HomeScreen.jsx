import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Available Crops:</h2>
            {products.length === 0 ? (
                <p>Loading crops...</p>
            ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                    {products.map((product) => (
                        <div
                            key={product._id}
                            style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}
                        >
                            <h3>{product.name}</h3>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                            <p><strong>Stock:</strong> {product.countInStock} kg</p>
                            <Link to={`/product/${product._id}`} key={product._id} style={{ textDecoration: 'none', color: 'black' }}>
                                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                                    {/* ... keep the inner h3 and p tags exactly the same ... */}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;