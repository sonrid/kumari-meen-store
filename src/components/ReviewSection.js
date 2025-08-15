import React, { useState } from 'react';

function ReviewSection({ reviews, onAddReview }) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !text) return;
    onAddReview({ username, text, rating });
    setUsername('');
    setText('');
    setRating(5);
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h4>Reviews</h4>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      <ul>
        {reviews.map((r, i) => (
          <li key={i}><strong>{r.username}</strong> ({r.rating}/5): {r.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginRight: '0.5rem' }}
          required
        />
        <input
          type="text"
          placeholder="Your review"
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ marginRight: '0.5rem' }}
          required
        />
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Add Review</button>
      </form>
    </div>
  );
}

export default ReviewSection;
