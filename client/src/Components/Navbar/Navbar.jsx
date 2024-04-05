import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
    const navigate = useNavigate()
    return (
        <div className={"navbar"}>
            <span className={"logo"}>Logo</span>
            <div className={"pages-links"}>
                <Link className={"nav-btn"} to='/'>Home</Link>
                <Link className={"nav-btn"} to='/Membership'>Membership</Link>
                <Link className={"nav-btn"} to='/Scholarships'>Scholarships</Link>
                <Link className={"nav-btn"} to='/Events'>Events</Link>
                <Link className={"nav-btn"} to='/About'>About Us</Link>
            </div>
            <div className={"account-btns"}>
                <button onClick={() => navigate('/LogIn')}>Login</button>
                <button onClick={() => navigate('/SignUp')}>Sign up</button>
            </div>
        </div>
    );
}

export default NavBar;