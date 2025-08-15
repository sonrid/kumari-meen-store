import React, { useState } from 'react';

function Checkout({ cart, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'COD',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if(!form.name) tempErrors.name = 'Name is required';
    if(!form.address) tempErrors.address = 'Address is required';
    if(!form.phone) tempErrors.phone = 'Phone number is required';
    else if(!/^\d{10}$/.test(form.phone)) tempErrors.phone = 'Phone must be 10 digits';
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0) {
      alert('Order placed successfully!');
      onOrderComplete();
    }
  };

  // Razorpay payment handler
  const handleRazorpay = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const options = {
      key: "rzp_test_YourApiKeyHere", // <-- Replace with your Razorpay Test Key ID
      amount: total * 100, // amount in paise
      currency: "INR",
      name: "Kumari Meen",
      description: "Purchase Dry Fish",
      handler: function(response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        onOrderComplete();
      },
      prefill: {
        name: form.name,
        contact: form.phone,
        email: "user@example.com", // Add proper email field if you have one
      },
      theme: {
        color: "#FFC857",
      },
    };

    // Open Razorpay window
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
            <label>Name:</label><br />
            <input type="text" name="name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}

            <label>Address:</label><br />
            <textarea name="address" value={form.address} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
            {errors.address && <p style={{color: 'red'}}>{errors.address}</p>}

            <label>Phone:</label><br />
            <input type="text" name="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
            {errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}

            <label>Payment Method:</label><br />
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }}>
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Pay Online</option>
            </select>

            <br /><br />
            <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFC857', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              Place Order
            </button>
          </form>
          <button
            type="button"
            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2F80ED', color: '#fff', border: 'none', marginTop: '1rem', fontWeight: 'bold' }}
            onClick={handleRazorpay}
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
