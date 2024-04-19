import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import './LoginSignUpButton.css';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button className={"navbar-auth-buttons"} onClick={() => loginWithRedirect()}>
            <span>Log In</span>
            <span></span>
        </button>
    );
};

export default LoginButton;