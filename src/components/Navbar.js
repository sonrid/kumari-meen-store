import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      background: 'var(--primary-color)',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      {/* Logo */}
      <img src="/logo.png" alt="Kumari Meen" style={{ height: '40px' }} />

      {/* Links */}
      <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
      <a href="/shop" style={{ color: '#fff', textDecoration: 'none' }}>Shop</a>
      <a href="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart</a>
      <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
      <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
    </nav>
  );
}
