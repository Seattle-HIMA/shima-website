import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import LoginButton from '../Auth/LoginButton';
import SignUpButton from '../Auth/SignUpButton';
import ProfileButton from '../Auth/ProfileButton';

function NavBar() {
    const {isAuthenticated, isLoading} = useAuth0();

    return (<div className={"navbar"}>
            <span className={"logo"}><img src={"https://i.postimg.cc/CxfDg7Y3/image-13.png"} alt={"logo"} className={"nav-logo-icon"}/></span>
            <div className={"pages-links"}>
                <Link className={"nav-btn"} to='/'>Home</Link>
                <Link className={"nav-btn"} to='/Membership'>Membership</Link>
                <Link className={"nav-btn"} to='/Scholarships'>Scholarships</Link>
                <Link className={"nav-btn"} to='/Events'>Events</Link>
                <Link className={"nav-btn"} to='/About'>About Us</Link>
            </div>
            <div className={"account-btns"}>
                {isLoading ? (
                    <span>Loading...</span>
                    ) : (
                        isAuthenticated ? (
                            <ProfileButton/>
                        ) : (
                            <>
                                <LoginButton/>
                                <SignUpButton/>
                            </>
                        )
                )}
            </div>
        </div>);
}

export default NavBar;