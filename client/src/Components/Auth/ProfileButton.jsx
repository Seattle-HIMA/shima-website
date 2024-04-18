import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import profileIcon from "../../utils/icons/user-profile-icon.png";
import './ProfileButton.css';

const ProfileButton = () => {
    const navigate = useNavigate()
    const {isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (isAuthenticated && (
        <img
            src={profileIcon}
            alt="Profile icon"
            onClick={() => navigate('/MyProfile')}
            className="profile-icon-navbar"
        />));
};

export default ProfileButton;