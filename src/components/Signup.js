import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" style={{ padding: "10px 20px" }}>
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
