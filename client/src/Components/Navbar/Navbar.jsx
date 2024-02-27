import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  return (
    <div className={"navbar"}>
      <span>Logo</span>
      <div className={"pages-links"}>
        <Link className={"nav-btn"} to='/'>Home</Link>
        <Link className={"nav-btn"} to='/Membership'>Membership</Link>
        <Link className={"nav-btn"} to='/Scholarships'>Scholarships</Link>
        <Link className={"nav-btn"} to='/Events'>Events</Link>
        <Link className={"nav-btn"} to='/About'>About Us</Link>
      </div>
      <div className={"account-btns"}>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default NavBar;