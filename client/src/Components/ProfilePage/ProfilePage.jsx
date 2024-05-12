import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";

import './ProfilePage.css'
import { PageLoader } from "../PageLoader";

function ProfilePage(props) {
    props.setShowFooter(true);
    const {user, isLoading, isAuthenticated} = useAuth0();

    async function addUserToDatabase() {
        try {
            const response = await fetch('/routes/users/add', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({email: user.email, firstName: user["given_name"], lastName: user["family_name"]}),
            });

            if (response.ok) {
                console.log('User added to database successfully');
            } else {
                console.error('Failed to add user to database');
            }
        } catch (error) {
            console.error('Error adding user to database:', error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        addUserToDatabase();

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