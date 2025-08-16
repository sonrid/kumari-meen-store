import React, { useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = ({ links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        style={{
          fontSize: "2rem",
          background: "none",
          border: "none",
          color: "var(--accent-color)",
          cursor: "pointer",
        }}
      >
        &#9776;
      </button>
      {open && (
        <nav
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            backgroundColor: "var(--primary-color)",
            padding: "1rem",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            zIndex: 1000,
          }}
        >
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{ color: "var(--accent-color)", textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
