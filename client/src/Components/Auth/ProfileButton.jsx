import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import profileIcon from "../../utils/icons/user-profile-icon.png";

import './ProfileButton.css';

const ProfileButton = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    /*
    pfp = user.picture
    full name = user.name
    email = user.email
     */

    return (
        isAuthenticated && (
            <img src={profileIcon} alt="Profile icon" className="profile-icon"/>
        )
    );
};

export default ProfileButton;