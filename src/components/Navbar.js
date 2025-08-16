import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../assets/logo.png"; // Adjust path if needed

const linkStyle = {
  color: "var(--accent-color)",
  fontWeight: "bold",
  margin: "0 0.5rem",
  textDecoration: "none"
};

const Navbar = ({ authUser, logout }) => (
  <header className="navbar-header">
    <div className="logo-container">
      <Link to="/">
        <img
          src={logo}
          alt="Kumari Meen Logo"
          style={{ height: "40px", marginRight: "1rem" }}
        />
      </Link>
    </div>
    <nav className="nav-desktop">
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/shop" style={linkStyle}>Shop</Link>
      <Link to="/cart" style={linkStyle}>Cart</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
      {authUser ? (
        <>
          <Link to="/orders" style={linkStyle}>Order History</Link>
          <span style={{ marginLeft: '1rem', fontWeight: 'bold', color: '#fff' }}>
            Welcome, {authUser.email}
          </span>
          <button
            onClick={logout}
            style={{
              marginLeft: '1rem',
              background: 'var(--accent-color)',
              color: '#222',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer'
            }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/signup" style={linkStyle}>Sign Up</Link>
        </>
      )}
    </nav>
    <div className="nav-mobile">
      <HamburgerMenu
        links={[
          { to: "/", label: "Home" },
          { to: "/shop", label: "Shop" },
          { to: "/cart", label: "Cart" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
          ...(authUser
            ? [
                { to: "/orders", label: "Order History" },
                // You can add a logout button/label to HamburgerMenu if desired
              ]
            : [
                { to: "/login", label: "Login" },
                { to: "/signup", label: "Sign Up" },
              ]),
        ]}
      />
    </div>
  </header>
);

export default Navbar;
