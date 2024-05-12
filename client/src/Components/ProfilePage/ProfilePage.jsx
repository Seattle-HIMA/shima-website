import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";

import './ProfilePage.css'
import { PageLoader } from "../PageLoader";

function ProfilePage(props) {
    props.setShowFooter(true);
    const {user, isLoading, isAuthenticated} = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (isLoading) {
        return <div><PageLoader/></div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="profile-page-wrapper">
        <img src={user.picture} alt={"pfp picture"}/>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

        <div>
            <LogoutButton/>
        </div>

    </div>);
}

export default ProfilePage;