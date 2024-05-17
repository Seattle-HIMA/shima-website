import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';
import lockImg from '../../utils/images/lock.png';
import calendarImg from '../../utils/images/calendar-icon.png';
import VideoPreviewModal from './VideoPreviewModal';
import {getPageDetails, statusCheck} from '../../utils/utils';
import './EventsPage.css';
import { useAuth0 } from "@auth0/auth0-react";

let pageInfo;
let sectionKeys;
let workshopsInfo;
let pastWorkshops = [];
let upcomingWorkshops = [];
let pastRecordings = [];

async function fetchPageInfo() {
    try {
        pageInfo = await getPageDetails('workshops');
        sectionKeys = Object.keys(pageInfo.subsections);
        workshopsInfo = await getWorkshopsInfo();

        workshopsInfo.forEach(workshop => {
            let currDate = new Date();
            if(new Date(workshop.date) > currDate) {
                upcomingWorkshops.push(workshop);
            } else {
                pastWorkshops.push(workshop);
            }

            if(workshop.recordLink) {
                pastRecordings.push(workshop);
            }
        });
    }catch(err) {
        console.error(err);
    }
}

await fetchPageInfo();

async function getWorkshopsInfo() {
    try {
        let res = await fetch('/routes/workshops/get-all-workshops');
        await statusCheck(res);
        let workshops = await res.json();
        return workshops;
    } catch(err){
        console.error(err);
    }
}

// retrieved user's paid workshops
async function getPaidWorkshops(user) {
    try{
        let res = await fetch('/routes/workshops/get-paid-workshops', {
            method: "POST",
            body: JSON.stringify({
                email: user.email}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        await statusCheck(res);
        let workshops = await res.json();
        return workshops;
    }catch (err) {
        console.error(err);
    }
}

async function checkPaidWorkshop(user, id) {
    try{
        let res = await fetch(`/routes/workshops/workshop-isPaid/${id}`, {
            method: "POST",
            body: JSON.stringify({
                email: user.email}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        await statusCheck(res);
        let alrPaid = await res.json();
        return alrPaid.isPaid;
    }catch (err) {
        console.error(err);
    }
}

function PastEventCard({flyer}) {
    const closeFlyerButton = require(`../../utils/images/close.png`);

    const [popupVisible, setPopupVisible] = useState(false);

    const showPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <article className="past-event-card">
            <img src={flyer} alt="flyer details" className="past-flyer" onClick={showPopup}/>
            {popupVisible && (<div className="popup-content">
                <div className="flyer-popup">
                    <img src={flyer} alt="flyer details" className="flyer-popup-img"/>
                    <img src={closeFlyerButton} alt="close flyer" className="close-flyer-button" onClick={closePopup}/>
                </div>
            </div>)}
        </article>
    );
}

function makePastEvent(title, speaker, description, flyer) {
    const showLargerFlyer = () => {
        console.log("large flyer");
        
    }
    return (
        <article className="past-event-card">
            <img src={flyer} alt="flyer details" onClick={showLargerFlyer}></img>
        </article>
    );
}

function EventsPage() {
    const navigate = useNavigate();
    const {loginWithRedirect, isAuthenticated, user} = useAuth0();
    const [userPaidWorkshops, setUserPaidWorkshops] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isAuthenticated && user) {
            (async () => {
                const workshops = await getPaidWorkshops(user);
                setUserPaidWorkshops(workshops['workshops']);
            })();
        }
    }, [isAuthenticated, user]);

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [paidVideo, setPaidVideo] = useState(false);

    const handleOpenVideoModal = async (video) => {
        if (isAuthenticated) {
            setSelectedVideo(video);
            setShowVideoModal(true);
            let paid = await checkPaidWorkshop(user, video._id);
            setPaidVideo(paid);
        } else {
            loginWithRedirect()
        }
    }

    const handleCloseVideoModal = () => {
        setShowVideoModal(false);
    }

    const videoCards = pastRecordings.map((video, index) => {
        let isPaid = false;

        if(userPaidWorkshops) {
            if (userPaidWorkshops.includes(video._id)) {
                isPaid = true;
            }
        }

        const thumbnailImg = require(`../../utils/images/placeholder-thumbnail.jpg`);
        return (
            <div key={index} className="video-card" onClick={() => handleOpenVideoModal(video)}>
                <div className="video-card-img" style={{backgroundImage: `url(${thumbnailImg})`}}>
                    <section></section>
                    {!isPaid && <img src={lockImg} alt="Lock" className="lock-image"/>}
                </div>
                <div className="video-card-content">
                    <h3 className="video-card-title">{video.name}</h3>
                </div>
            </div>
        )
    });

    const makeUpcomingSectionHeader = () => {
        let sectionInfo = pageInfo.subsections[sectionKeys[0]];
        let forms = sectionInfo.Forms.map(form => {
            if(form === "Registration Form") {
                return <p key={form} onClick={() => {navigate('/Registration', { state: {upcoming: upcomingWorkshops} })}}>{form}</p>
            } else {
                return <p key={form}>{form}</p>
            }
        } );

        return(
            <div className={"events-label"}>
                <h2>{sectionKeys[0]}</h2>
                {forms}
            </div>
        )
    }

    const [selectedEvents, setSelectedEvents] = useState(null);

    const handleWorkshopReg = (workshop) => {
        if(isAuthenticated) {
            setSelectedEvents(workshop);
            navigate('/Registration', { state: {workshop: workshop, upcoming: upcomingWorkshops} });
        } else {
            loginWithRedirect()
        }
    }

    const makeUpcomingWorkshops = () => {
        let upcoming = upcomingWorkshops.map(workshop => {
            let flyerImg = require(`../../utils/images/${workshop.flyer}`);
            let date = new Date(workshop.date)
            let formattedDate = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric', // Day of the month
                year: 'numeric', // Full year
            });

            return (
                <div className={"upcoming-event-section"}>
                    <div>
                        <img className={"upcoming-event-image"} src={flyerImg} alt="Event Flyer"/>
                    </div>
                    <div className={"upcoming-event-body"}>
                        <div className="event-date">
                            <img src={calendarImg} alt="Calendar"/>
                            <p>{formattedDate}</p>
                        </div>
                        <h2 className={"upcoming-event-title"}>
                            {workshop.name}<br></br><span>by {workshop.speaker}</span>
                        </h2>
                        <p className={"upcoming-event-description"}>{workshop.description}</p>
                        <button  onClick={() => {handleWorkshopReg(workshop)}}>Register
                        </button>
                    </div>
                </div>
            );
        });

        return (
            <div>{upcoming}</div>
        );
    };

    const makePastWorkshops = () => {
        const workshops = pastWorkshops.map((item, index) => {
            const flyerImg = require(`../../utils/images/${item.flyer}`);
            return (
                <PastEventCard
                    key={index}
                    flyer={flyerImg}
                />
            );
        });
    
        return (
            <div className="past-event-section">
                <h2>{sectionKeys[2]}</h2>
                <div className="past-event-flyers">
                    {workshops}
                </div>
            </div>
        );
    }
    

    return (
        <div>
            <div className={"events-page"}>
                <div className={"header"}>
                    <img src={backgroundImg} alt="Rooftop view" id="events-img"></img>
                    <section>
                        <h1 className={"title-text"}>{pageInfo.title}</h1>
                        <p className={"caption-text"}>{pageInfo.description}</p>
                    </section>
                </div>
            </div>
            {makeUpcomingSectionHeader()}
            {makeUpcomingWorkshops()}

            {isAuthenticated && <div className="video-section">
                <h2>{sectionKeys[1]}</h2>
                <div className="video-cards">
                    {videoCards}

                    {showVideoModal && (
                        <VideoPreviewModal paid={paidVideo} video={selectedVideo} onClose={handleCloseVideoModal} />
                    )}
                </div>
            </div>}
            {makePastWorkshops()}
        </div>
    )
}

export default EventsPage;