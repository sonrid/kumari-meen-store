import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px' }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input 
          name="name" 
          type="text" 
          value={form.name} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '0.5rem' }} 
          required 
        /><br /><br />
        
        <label>Email:</label><br />
        <input 
          name="email" 
          type="email" 
          value={form.email} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '0.5rem' }} 
          required 
        /><br /><br />
        
        <label>Message:</label><br />
        <textarea 
          name="message" 
          value={form.message} 
          onChange={handleChange} 
          rows={5} 
          style={{ width: '100%', padding: '0.5rem' }} 
          required 
        /><br /><br />
        
        <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#FFC857', border: 'none', cursor: 'pointer' }}>
          Send
        </button>
      </form>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Contact Information</h3>
        <p>Phone: +91 12345 67890</p>
        <p>Email: support@kumarimeen.com</p>
      </div>
    </div>
  );
}

export default Contact;
