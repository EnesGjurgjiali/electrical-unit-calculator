import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Kalkulatori Elektrik</Link> {/* Use Link here */}
          </li>
          <li>
            <Link to="/unit-converter">Shëndërrimi i Njësive</Link> {/* Use Link here */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
