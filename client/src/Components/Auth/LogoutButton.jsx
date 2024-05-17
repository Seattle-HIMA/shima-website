import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './LogoutButton.css';

const LogoutButton = () => {
    const {logout} = useAuth0();

    return (
        <button className={"logout-button-styling"} onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>
            Log Out
        </button>);
};

export default LogoutButton;