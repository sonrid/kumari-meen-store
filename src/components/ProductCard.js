import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <img 
        src={product.img} 
        alt={product.name} 
        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
      />
      <h3 style={{ margin: '0' }}>{product.name}</h3>
      <p style={{ margin: '0', fontWeight: 'bold' }}>₹{product.price}</p>
      <button 
        onClick={() => onAddToCart(product)} 
        style={{
          backgroundColor: '#FFC857',
          border: 'none',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
