import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className={"footer-section"}>
            <div className={"contact-us"}>
                <div className={"info"}>
                    <h1>Contact Us</h1>
                    <p>SHIMA P.O. Box 95264 Seattle, WA 98145</p>
                </div>
                <div className={"social-links"}>
                    <p>Social link icons</p>
                </div>
            </div>

            <div className={"links"}>
                <Link className="nav-btn" to='/'>Home</Link>
                <Link className="nav-btn" to='/Membership'>Membership</Link>
                <Link className="nav-btn" to='/Scholarships'>Scholarships</Link>
                <Link className="nav-btn" to='/Events'>Events</Link>
                <Link className="nav-btn" to='/About'>About Us</Link>
            </div>
            <hr></hr>
        </div>
    )
}

export default Footer;