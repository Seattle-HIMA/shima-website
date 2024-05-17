import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Auth/LogoutButton";
import './ProfilePage.css';
import { PageLoader } from "../Pages/PageLoader";
import { getCurrentUser } from "../Services/Users.service";

function ProfilePage() {
    const {user, isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [currUser, setCurrUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            };

            getUser();
        }

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently, isAuthenticated]);

    useEffect(() => {
        if (currUser) {
            setUserName(currUser.firstName ? `${currUser.firstName} ${currUser.lastName || ''}` : user.name);
            setUserEmail(currUser.email || user.email);
            setMembershipStatus(currUser.membershipType);
        }
    }, [currUser]);

    if (isLoading) {
        return <div><PageLoader/></div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    console.log("user: ", JSON.stringify(membershipStatus));

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={user.picture} alt="Profile" className="profile-picture"/>
            </div>
            <div className="profile-info">
                <div className="profile-info-field">
                    <label>Name</label>
                    <div className={"profile-info-field-text"}>{userName}</div>
                </div>
                <div className="profile-info-field">
                    <label>Email</label>
                    <div className={"profile-info-field-text"}>{userEmail}</div>
                </div>
            </div>
            <div className="membership-status">
                <h3>Membership status</h3>
                <p>{membershipStatus !== "none" ? membershipStatus : 'No membership'}</p>
            </div>
            <div className="event-history">
                <h3>Event history</h3>
                <div className={"event-history-content"}>
                    <div className="event">
                        event name
                    </div>
                </div>

            </div>
            <div className="logout-button">
                <LogoutButton/>
            </div>
        </div>
    );
}

export default ProfilePage;
