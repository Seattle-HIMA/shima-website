import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";

import './ProfilePage.css'
import { PageLoader } from "../Pages/PageLoader";
import { getCurrentUser } from "../Services/Users.service";

function ProfilePage() {
    const {user, isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [currUser, setCurrUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        let isMounted = true;

        if (isAuthenticated) {
            const getUser = async () => {
                if (isAuthenticated && !isLoading) {
                    const accessToken = await getAccessTokenSilently();
                    const email = user.email;
                    const {data, error} = await getCurrentUser(accessToken, email);

                    if (!isMounted) return '';
                    if (data) setCurrUser(data);
                    if (error) setCurrUser(null);
                }
            }

            getUser();
        }

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently, isAuthenticated])

    useEffect(() => {
        if (currUser) {
            setUserName(currUser.firstName ? `${currUser.firstName} ${currUser.lastName || ''}` : user.name);
            setUserEmail(currUser.email || user.email);
        }
    }, [currUser]);

    if (isLoading) {
        return <div><PageLoader/></div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="profile-page-wrapper">
            <img src={user.picture} alt={"pfp picture"}/>
            <p>Name: {userName}</p>
            <p>Email: {userEmail}</p>

            <div>
                <LogoutButton/>
            </div>

        </div>);
}

export default ProfilePage;