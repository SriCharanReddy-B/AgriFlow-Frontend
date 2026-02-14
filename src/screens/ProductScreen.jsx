import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    // MISSING LINE 1: Grabbing the addToCart function from the Cloud
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none', color: '#2E7D32', fontWeight: 'bold' }}>
                &larr; Go Back
            </Link>

            {product.name ? (
                <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h1>{product.name}</h1>
                    <hr />
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <h2>Price: ₹{product.price}</h2>

                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', width: '250px' }}>
                        <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>

                        <button
                            // MISSING LINE 2: The actual click event!
                            onClick={() => addToCart(product)}
                            disabled={product.countInStock === 0}
                            style={{ padding: '10px 20px', backgroundColor: product.countInStock > 0 ? '#2E7D32' : '#ccc', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductScreen;