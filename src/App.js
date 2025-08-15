import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  // Load cart from localStorage initially
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [page, setPage] = useState('shop');

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleOrderComplete = () => {
    alert('Thank you for your order!');
    setCart([]);
    setPage('shop');
  };

  return (
    <>
      <Navbar />

      <nav style={{ margin: '1rem' }}>
        <button onClick={() => setPage('shop')}>Shop</button>
        <button onClick={() => setPage('cart')}>View Cart ({cart.length})</button>
        <button onClick={() => setPage('checkout')}>Checkout</button>
        <button onClick={() => setPage('about')}>About</button>
        <button onClick={() => setPage('contact')}>Contact</button>
      </nav>

      {page === 'shop' && <Shop addToCart={addToCart} />}
      {page === 'cart' && <Cart cart={cart} setCart={setCart} />}
      {page === 'checkout' && <Checkout cart={cart} onOrderComplete={handleOrderComplete} />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}

      <Footer />
    </>
  );
}

export default App;
