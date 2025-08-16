import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '6px' }}>
          <span style={{ flex: 2 }}>{item.name}</span>
          <span style={{ flex: 1 }}>Price: ₹{item.price}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ margin: '0 5px' }}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ margin: '0 5px' }}>+</button>
          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px', background: 'red', color: '#fff', padding: '4px 8px', border: 'none', borderRadius: '4px' }}>Remove</button>
        </div>
      ))}
      <div style={{ fontWeight: 'bold', marginTop: '1rem' }}>Total: ₹{totalPrice}</div>
      <Link to="/checkout">
        <button style={{ marginTop: '1rem', backgroundColor: 'var(--accent-color)', color: '#222', padding: '0.6rem 1rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}

export default Cart;
