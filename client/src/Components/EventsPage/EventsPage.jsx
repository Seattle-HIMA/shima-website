import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';
import lockImg from '../../utils/images/lock.png';
import calendarImg from '../../utils/images/calendar-icon.png';
import VideoPreviewModal from './VideoPreviewModal';
import './EventsPage.css';
import { useAuth0 } from "@auth0/auth0-react";

const EVENT_INFO = [
    {
        "title": "Successful Healthcare IT projects",
        "speaker": "Tabitha Lieberman",
        "description": "A renowned health IT leader, Tabitha Lieberman has more than 30 years of experience powering transformational implementations, digital integrations, and deployments.",
        "flyerSource": "flyer-1.png",
        "date": "2025-10-21"
    },
    {
        "title": "From Data Entry to Policy Input",
        "speaker": "Jim Condon",
        "description": "Dr. Jim Condon is an Associate Teaching Professor and Director of the Health Informatics and Health Information Management undergraduate and graduate programs at the University of Washington",
        "flyerSource": "flyer-2.png",
        "date": "2025-11-18"
    },
    {
        "title": "Event 3",
        "speaker": "Speaker 3",
        "description": "description here",
        "flyerSource": "flyer-3.jpg",
        "date": "2023-04-21"
    },
    {
        "title": "Spheres & Shades",
        "speaker": "Isaac Gribben",
        "description": "A Look Into The Venn Diagram Of Differing Aspects Of Clinical Operations And Risk Stratification",
        "flyerSource": "spheres-and-shades.jpg",
        "date": "2024-05-04"
    }
]

const VIDEO_INFO = [
    {
        "title": "Successful Healthcare IT projects",
        "link": "youtube.com",
        "thumbnail": "placeholder-thumbnail.jpg"
    },
    {
        "title": "Video 2",
        "link": "youtube.com",
        "thumbnail": "placeholder-thumbnail.jpg"
    },
    {
        "title": "Video 3",
        "link": "youtube.com",
        "thumbnail": "placeholder-thumbnail.jpg"
    }
]

function makeUpcomingEvent(navigate, title, speaker, description, flyer, eventDate, index) {
    const flyerImg = require(`../../utils/images/${flyer}`);
    const date = new Date(eventDate);
    date.setDate(date.getDate() + 1);

    const formattedDate = date.toLocaleDateString('en-US', {
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
                    {title}<br></br><span>by {speaker}</span>
                </h2>
                <p className={"upcoming-event-description"}>{description}</p>
                <button className={""} onClick={() => navigate('/Registration')}>Register
                </button>
            </div>
        </div>
    );
}

function makePastEvent(title, speaker, description, flyer) {
    const flyerImg = require(`../../utils/images/${flyer}`);

    return (
        <div>
            <article className="past-event-card">
                <div className={"past-event-card-header-img"} style={{backgroundImage: `url(${flyerImg}`}}></div>
                <div className={"past-event-card-body"}>
                    <h3 className={"past-event-card-name"}>{title} by {speaker}</h3>
                    <h3 className={"past-event-card-text"}>
                        {description}
                    </h3>
                    <h3 className={"past-event-card-arrow-button"} onClick={() => {
                    }}>
                        <div className={"past-event-card-read-more-text"}>Read More</div>
                        <span className={"material-symbols-outlined"}>expand_circle_right</span>
                    </h3>
                </div>
            </article>
        </div>
    );
}

function EventsPage() {
    const navigate = useNavigate();
    const {loginWithRedirect, isAuthenticated, user, isLoading} = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleOpenVideoModal = (video) => {
        if (isAuthenticated) {
            setSelectedVideo(video);
            setShowVideoModal(true);
        } else {
            loginWithRedirect()
        }
    }

    const handleCloseVideoModal = () => {
        setShowVideoModal(false);
    }

    const statusCheck = async (res) => {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    // retrieved user's paid workshops
    const getPaidWorkshops = async () => {
        try{
            let res = await fetch('/routes/users//get-paid-workshops');
            await statusCheck(res);
            let workshops = await res.json();
            console.log(workshops);
        }catch (err) {
            console.error(err);
        }
    }

    const currentDate = new Date();
    const {upcomingEvents, pastEvents} = EVENT_INFO.reduce((acc, item, index) => {
        const eventDate = new Date(item.date);
        if (currentDate <= eventDate) {
            acc.upcomingEvents.push(makeUpcomingEvent(navigate, item.title, item.speaker, item.description, item.flyerSource, item.date, index));
        } else {
            acc.pastEvents.push(makePastEvent(item.title, item.speaker, item.description, item.flyerSource, item.date, index));
        }
        return acc;
    }, {upcomingEvents: [], pastEvents: []});

    const videoCards = VIDEO_INFO.map((video, index) => {
        const thumbnailImg = require(`../../utils/images/${video.thumbnail}`);
        return (
            <div key={index} className="video-card" onClick={() => handleOpenVideoModal(video)}>
                <div className="video-card-img" style={{backgroundImage: `url(${thumbnailImg})`}}>
                    <section></section>
                    <img src={lockImg} alt="Lock" className="lock-image"/>
                </div>
                <div className="video-card-content">
                    <h3 className="video-card-title">{video.title}</h3>
                    {/* access link only if the video is unlocked */}
                    <a className="video-card-link" href={`https://${video.link}`} target="_blank"
                       rel="noopener noreferrer">Watch Video</a>
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="events-page">
                <div className="header">
                    <img src={backgroundImg} alt="Rooftop view" id="events-img"></img>
                    <section>
                        <h1>Workshops</h1>
                        <p className={"caption-text"}>Upcoming workshops and events.</p>
                    </section>
                </div>
            </div>
            <div className="events-label">
                <h2>Upcoming workshops</h2>
                <p>Registration Form</p>
                <p>Speaker Interest Form</p>
            </div>
            <div>
                {upcomingEvents}
            </div>
            <div className="video-section">
                <h2>Videos</h2>
                <div className="video-cards">
                    {videoCards}

                    {showVideoModal && (
                        <VideoPreviewModal video={selectedVideo} onClose={handleCloseVideoModal} />
                    )}
                </div>
            </div>
            <div className="past-event-section">
                <h2>Previous Workshops</h2>
                <div className="past-event-cards">
                    {pastEvents}
                </div>
            </div>
        </div>
    )
}

export default EventsPage;