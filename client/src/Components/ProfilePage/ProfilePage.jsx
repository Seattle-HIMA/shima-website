import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";

import './ProfilePage.css'

function ProfilePage(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {user, isLoading, isAuthenticated} = useAuth0();

    if (isLoading) {
        return <div>Loading Profile Information...</div>;
    }

    return (isAuthenticated && (
        <div className="profile-page-wrapper">
            <img src={user.picture} alt={"pfp picture"}/>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>

            <div>
                <LogoutButton/>
            </div>

        </div>
    ));
}

export default ProfilePage;