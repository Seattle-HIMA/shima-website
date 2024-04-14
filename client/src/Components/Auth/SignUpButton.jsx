import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import './LoginSignUpButton.css';

const SignUpButton = () => {
    const {loginWithRedirect} = useAuth0();

    const handleSignUp = () => {
        loginWithRedirect({
            authorizationParams: {screen_hint: "signup"}
        });
    }

    return (
        <button onClick={handleSignUp} className={"navbar-auth-buttons navbar-sign-up-button"}>
            Sign Up
        </button>);
};

export default SignUpButton;