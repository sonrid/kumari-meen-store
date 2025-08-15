import React from 'react';

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem'}}>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>
                Quantity: 
                <button onClick={() => updateQuantity(item.id, item.quantity -1)}>-</button>
                <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity +1)}>+</button>
              </p>
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.3rem 0.5rem' }}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ₹{totalPrice}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
