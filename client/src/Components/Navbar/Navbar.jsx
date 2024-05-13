import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import LoginButton from '../Auth/LoginButton';
import SignUpButton from '../Auth/SignUpButton';
import ProfileButton from '../Auth/ProfileButton';

const logo = "https://i.postimg.cc/CxfDg7Y3/image-13.png";

const normalView = (<>
    <ul className="nav-list">
        <li><Link className="nav-btn" to="/">Home</Link></li>
        <li><Link className="nav-btn" to="/Membership">Membership</Link></li>
        <li><Link className="nav-btn" to="/Scholarships">Scholarships</Link></li>
        <li><Link className="nav-btn" to="/Events">Workshops</Link></li>
        <li><Link className="nav-btn" to="/About">About Us</Link></li>
    </ul>
</>);

const adminView = (<>
    <Link className={"nav-btn"} to='/'>Home</Link>
    <Link className={"nav-btn"} to='/ViewMembershipList'>Membership List</Link>
</>);

function NavBar(props) {
    const {isAuthenticated} = useAuth0();
    const isAdmin = props.isAdmin;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (<div className={"navbar"}>
        <span className={"logo"}>
            <img src={logo} alt={"logo"} className={"nav-logo-icon"}/>
        </span>
        <div className={`pages-links ${isMobileMenuOpen ? 'open' : ''}`}>
            {isAdmin ? adminView : normalView}
        </div>
        <div className={"account-btns"}>
            {isAuthenticated ? (<ProfileButton/>) : (<>
                <LoginButton/>
                <SignUpButton/>
            </>)}
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>

    </div>);
}

export default NavBar;