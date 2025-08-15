import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

function Shop({ addToCart }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shop Our Dry Fish</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
