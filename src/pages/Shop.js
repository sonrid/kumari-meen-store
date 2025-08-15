import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import productsData from '../data/products';

function Shop({ addToCart }) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(productsData);

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      const reviewObj = JSON.parse(savedReviews);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          reviewObj[product.id]
            ? { ...product, reviews: reviewObj[product.id] }
            : product
        )
      );
    }
  }, []);

  // Save reviews to localStorage when products change (review added)
  useEffect(() => {
    const reviewObj = {};
    products.forEach(product => {
      reviewObj[product.id] = product.reviews || [];
    });
    localStorage.setItem('reviews', JSON.stringify(reviewObj));
  }, [products]);

  const handleAddReview = (productId, review) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, reviews: [...(product.reviews || []), review] }
          : product
      )
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shop Our Dry Fish</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '200px' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {filteredProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
            <ReviewSection
              reviews={product.reviews || []}
              onAddReview={review => handleAddReview(product.id, review)}
            />
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && <p>No products found.</p>}
    </div>
  );
}

export default Shop;
