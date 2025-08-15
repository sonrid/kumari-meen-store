import React, { useState } from 'react';

function Checkout({ cart, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'COD',
  });
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate the form
  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = 'Name is required';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.phone) tempErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) tempErrors.phone = 'Phone number must be 10 digits';
    return tempErrors;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Order placed successfully!');
      onOrderComplete();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add products before checking out.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
          <div>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
          </div>
          <div>
            <label>Address:</label><br />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}
          </div>
          <div>
            <label>Phone Number:</label><br />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
          </div>
          <div>
            <label>Payment Method:</label><br />
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>
          <br />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFC857', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
