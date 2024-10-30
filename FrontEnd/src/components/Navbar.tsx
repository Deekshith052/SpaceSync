// src/Navbar.tsx
import React from 'react';
import '../Navbar.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* <img src="" alt="Logo" className="logo" /> Replace with your logo path  */}
        <span className="logo-name">SpaceSync</span>
      </div>
      
      <div className="navbar-right">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/services" className="nav-button">Services</Link>
        <Link to="/login" className="nav-button" >Log In</Link>
        <Link to="/signup" className="nav-button">Sign Up</Link>
      </div>

    </nav>
  );
};

export default Navbar;
