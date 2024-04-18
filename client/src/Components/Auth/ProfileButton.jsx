import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import profileIcon from "../../utils/icons/profile-icon.png";

import

const ProfileButton = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            // <div>
            //     <img src={user.picture} alt={user.name} />
            //     <h2>{user.name}</h2>
            //     <p>{user.email}</p>
            // </div>
            <img src={profileIcon} alt="Profile icon" className="profile-icon" />
        )
    );
};

export default ProfileButton;