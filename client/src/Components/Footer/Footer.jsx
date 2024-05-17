import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import igIcon from '../../utils/images/instagram-logo.png';
import linkedInIcon from '../../utils/images/board-members/linkedin-icon.png';
const logo = "https://i.postimg.cc/CxfDg7Y3/image-13.png";


function Footer() {
    return (
        <div className={"footer-section"}>
            <div className={"footer-content"}>
                <div className={"info"}>
                    <img src={logo} alt="shima logo" className="footer-logo"/>
                </div>
                <div className={"links"}>
                    <Link className="nav-btn" to='/'>HOME</Link>
                    <Link className="nav-btn" to='/Membership'>MEMBERSHIP</Link>
                    <Link className="nav-btn" to='/Scholarships'>SCHOLARSHIPS</Link>
                    <Link className="nav-btn" to='/Events'>EVENTS</Link>
                    <Link className="nav-btn" to='/About'>ABOUT US</Link>
                </div>
                <div className={"social-links"}>
                    <h2>Socials</h2>
                    <a href ={"https://www.instagram.com/seattle.hima/"} rel="noreferrer" target="_blank">
                        <img src={igIcon} alt="instagram icon" className="social-icon"/>
                        <p>INSTAGRAM</p>
                    </a>
                    <a href ={"https://www.linkedin.com/company/seattle-hima/"} rel="noreferrer" target="_blank">
                        <img src={linkedInIcon} alt="linkedIn icon" className="social-icon"/>
                        <p>LINKEDIN</p>
                    </a>
                </div>
            </div>
        <hr></hr>
        </div>
    )
}

export default Footer;