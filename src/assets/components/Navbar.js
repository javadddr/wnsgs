import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/dash" className="navbar-link">Dashboard</Link>
    </div>
  );
}

export default Navbar;
