import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LogoutButton from "../Auth/LogoutButton";
import './ProfilePage.css';
import { PageLoader } from "../Pages/PageLoader";
import { getCurrentUser } from "../Services/Users.service";
import { getWorkshopById } from "../Services/Workshops.service";
import PurchasedRecordingCard from "./PurchasedRecordingCard";
import RegisteredEventCard from "./RegisteredEventCard";

function ProfilePage() {
    const {user, isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [currUser, setCurrUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");
    const [purchasedRecordingDetails, setPurchasedRecordingDetails] = useState({});
    const [registeredEventDetails, setRegisteredEventDetails] = useState({});

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

                    if (!isMounted) return;
                    if (data) {
                        setCurrUser(data);
                    }
                    if (error) setCurrUser(null);
                }
            };

            getUser();
        }

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

    useEffect(() => {
        if (currUser) {
            setUserName(currUser.firstName ? `${currUser.firstName} ${currUser.lastName || ''}` : user.name);
            setUserEmail(currUser.email || user.email);
            setMembershipStatus(currUser.membershipType);

            if (currUser.registeredPastRecordings) {
                const fetchPurchasedRecordingDetails = async () => {
                    const accessToken = await getAccessTokenSilently();
                    const details = {};
                    await Promise.all(currUser.registeredPastRecordings.map(async (workshopId) => {
                        const {data} = await getWorkshopById(accessToken, workshopId);
                        if (data) {
                            details[workshopId] = data;
                        }
                    }));
                    setPurchasedRecordingDetails(details);
                };

                fetchPurchasedRecordingDetails();
            }

            if (currUser.registeredEvents) {
                const fetchRegisteredEventDetails = async () => {
                    const accessToken = await getAccessTokenSilently();
                    const details = {};
                    await Promise.all(currUser.registeredEvents.map(async (workshopId) => {
                        const {data} = await getWorkshopById(accessToken, workshopId);
                        if (data) {
                            details[workshopId] = data;
                        }
                    }));
                    setRegisteredEventDetails(details);
                };

                fetchRegisteredEventDetails();
            }
        }
    }, [currUser, getAccessTokenSilently, user]);

    if (isLoading) {
        return <div><PageLoader/></div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }
    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={user.picture} alt="Profile" className="profile-picture"/>
            </div>

            <div className="profile-info">
                <div className="profile-info-field">
                    <label className="profile-info-label">Name</label>
                    <div className="profile-info-field-text">{userName}</div>
                </div>
                <div className="profile-info-field">
                    <label className="profile-info-label">Email</label>
                    <div className="profile-info-field-text">{userEmail}</div>
                </div>
            </div>

            <div className="membership-status">
                <h3 className="membership-status-heading">Membership status</h3>
                <p className="membership-status-text">{membershipStatus !== "none" ? membershipStatus : 'No membership'}</p>
            </div>

            <div className="profile-event-history">
                <h3 className="event-history-heading">Registered Events</h3>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows className="carousel">
                    {currUser && currUser.registeredEvents.length > 0 ? (
                        currUser.registeredEvents.map((workshopId, index) => {
                            const registeredEvent = registeredEventDetails[workshopId];
                            return registeredEvent ? (
                                <div key={index} className="slide">
                                    <RegisteredEventCard workshop={registeredEvent}/>
                                </div>
                            ) : (
                                <div key={index} className="event-loading">Loading...</div>
                            );
                        })
                    ) : (
                        <div className="event-loading">No registered events.</div>
                    )}
                </Carousel>
            </div>

            <div className="profile-recording-history">
                <h3 className="recording-history-heading">Purchased Workshop Recordings</h3>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows className="carousel">
                    {currUser && currUser.registeredPastRecordings.length > 0 ? (
                        currUser.registeredPastRecordings.map((workshopId, index) => {
                            const purchasedRecording = purchasedRecordingDetails[workshopId];
                            return purchasedRecording ? (
                                <div key={index} className="slide">
                                    <PurchasedRecordingCard workshop={purchasedRecording}/>
                                </div>
                            ) : (
                                <div key={index} className="event-loading">Loading...</div>
                            );
                        })
                    ) : (
                        <div className="event-loading">No workshop recordings purchased.</div>
                    )}
                </Carousel>
            </div>

            <div className="logout-button">
                <LogoutButton/>
            </div>
        </div>
    );


}

export default ProfilePage;
