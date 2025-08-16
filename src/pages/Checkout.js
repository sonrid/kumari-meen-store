import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase"; // Adjust path if needed

function Checkout({ cart, onOrderComplete }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'COD',
  });
  const [errors, setErrors] = useState({});
  const db = getFirestore();

  // Save order to Firestore with user ID and timestamp
  const saveOrderToFirestore = async (cart, total) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to place an order");
      return;
    }
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid, // Important for order history
        items: cart,
        total: total,
        customer: {
          name: form.name,
          address: form.address,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
        date: serverTimestamp(),
      });
      console.log("Order saved!"); // Debug log
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = 'Name is required';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.phone) tempErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) tempErrors.phone = 'Phone must be 10 digits';
    return tempErrors;
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle form submit for COD
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await saveOrderToFirestore(cart, total);
      alert('Order placed successfully!');
      onOrderComplete();
    }
  };

  // Razorpay payment handler
  const handleRazorpay = () => {
    const options = {
      key: "rzp_test_YourApiKeyHere", // Replace with your Razorpay Test Key ID
      amount: total * 100, // amount in paise
      currency: "INR",
      name: "Kumari Meen",
      description: "Purchase Dry Fish",
      handler: async function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        await saveOrderToFirestore(cart, total);
        onOrderComplete();
      },
      prefill: {
        name: form.name,
        contact: form.phone,
        email: "user@example.com", // Optional: use real email if available
      },
      theme: {
        color: "#FFC857",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      border: "1px solid #ddd",
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} style={{ marginLeft: 8, width: "100%" }} />
            {errors.name && <span style={{ color: "red", marginLeft: 8 }}>{errors.name}</span>}
          </label>
          <label>
            Address:
            <input type="text" name="address" value={form.address} onChange={handleChange} style={{ marginLeft: 8, width: "100%" }} />
            {errors.address && <span style={{ color: "red", marginLeft: 8 }}>{errors.address}</span>}
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={form.phone} onChange={handleChange} style={{ marginLeft: 8, width: "100%" }} />
            {errors.phone && <span style={{ color: "red", marginLeft: 8 }}>{errors.phone}</span>}
          </label>
          <label>
            Payment Method:
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} style={{ marginLeft: 8 }}>
              <option value="COD">Cash on Delivery</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </label>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem", marginTop: "1rem" }}>
            Total: ₹{total}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            {form.paymentMethod === "COD" ? (
              <button type="submit" style={{
                backgroundColor: "var(--accent-color)",
                color: "#222",
                padding: "0.6rem 1.5rem",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Place Order (COD)
              </button>
            ) : (
              <button type="button" onClick={handleRazorpay} style={{
                backgroundColor: "var(--accent-color)",
                color: "#222",
                padding: "0.6rem 1.5rem",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}>
                Pay with Razorpay
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Checkout;
