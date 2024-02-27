import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  return (
    <div id="navbar">
      <span>Logo</span>
      <div id="pages-links">
        <Link className="nav-btn" to='/'>Home</Link>
        <Link className="nav-btn" to='/Membership'>Membership</Link>
        <Link className="nav-btn" to='/Scholarships'>Scholarships</Link>
        <Link className="nav-btn" to='/Events'>Events</Link>
        <Link className="nav-btn" to='/About'>About Us</Link>
      </div>
      <button>Login</button>
    </div>
  );
}

export default NavBar;