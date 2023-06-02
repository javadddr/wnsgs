import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logos from "./logos.svg"
function Navbar() {
  return (
    <div className="navbar">
      <div>
      <img src={logos} alt="logo" className='logo5'></img>
      </div>
      <div className="navbar-links">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/wnsgs/dash" className="navbar-link">Dashboard</Link>
      <Link to="/wnsgs/raw" className="navbar-link">Raw Data</Link>
      </div>
      
    </div>
  );
}

export default Navbar;
