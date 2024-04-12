import React, {useEffect} from 'react';
import backgroundImg from '../../utils/images/events-background.png';

import './EventsPage.css';

const EVENT_INFO = [
    {
        "title": "Successful Healthcare IT projects",
        "speaker": "Tabitha Lieberman",
        "description": "A renowned health IT leader, Tabitha Lieberman has more than 30 years of experience powering transformational implementations, digital integrations, and deployments.",
        "flyerSource": "flyer-1.png",
        "date": "2023-10-21"
    },
    {
        "title": "From Data Entry to Policy Input",
        "speaker": "Jim Condon",
        "description": "Dr. Jim Condon is an Associate Teaching Professor and Director of the Health Informatics and Health Information Management undergraduate and graduate programs at the University of Washington",
        "flyerSource": "flyer-2.png",
        "date": "2023-11-18"
    },
    {
        "title": "Event 3",
        "speaker": "Speaker 3",
        "description": "description here",
        "flyerSource": "flyer-3.jpg",
        "date": "2024-04-13"
    },
    {
        "title": "Spheres & Shades",
        "speaker": "Isaac Gribben",
        "description": "A Look Into The Venn Diagram Of Differing Aspects Of Clinical Operations And Risk Stratification",
        "flyerSource": "spheres-and-shades.jpg",
        "date": "2024-05-04"
    }

]

function makeUpcomingEvent(title, speaker, description, flyer, eventDate, index) {
    const flyerImg = require(`../../utils/images/${flyer}`);
    const styleNum = index % 2 === 0 ? 1 : 2;
    // discovered a bug - the index is based on its order in the json array, not on the page
    return (
        <div className={"event-section" + styleNum}>
            <div className={"event-image" + styleNum}>
                <img src={flyerImg} alt="Event Flyer"/>
            </div>
            <div className={"event-body" + styleNum}>
                <h2 className={"event-title" + styleNum}>
                    {title}<br></br><span>by {speaker}</span>
                </h2>
                <p className={"event-description" + styleNum}>{description}</p>
                <p className={"event-date" + styleNum}>Date: {eventDate}</p>
                <button class={"event-button" + styleNum}>Click here</button>
            </div>
        </div>
    );

    /* annie's notes
    if styleNum is 1, return div with image first and .1 styles
    if styleNum is 2, return div with text elements above image
    may be easier to align the image to the right this way and prob makes more sense
    */
}

function makePastEvent(title, speaker, description, flyer, eventDate, index) {
    console.log(title);
    return (
        <div></div>
    );
}

function EventsPage(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    var currentDate = new Date();
    const {upcomingEvents, pastEvents} = EVENT_INFO.reduce((acc, item, index) => {
        var eventDate = new Date(item.date);
        if (currentDate <= eventDate) {
            acc.upcomingEvents.push(makeUpcomingEvent(item.title, item.speaker, item.description, item.flyerSource, item.date, index));
        } else {
            acc.upcomingEvents.push(makePastEvent(item.title, item.speaker, item.description, item.flyerSource, item.date, index));
        }
        return acc;
    }, {upcomingEvents: [], pastEvents: [] });

    return (
        <div>
            <div class="events-page">
                <div class="header">
                    <img src={backgroundImg} alt="Rooftop view" id="events-img"></img>
                    <section>
                        <h1>Workshops</h1>
                        <p className={"caption-text"}>Upcoming workshops and events.</p>
                    </section>
                </div>
            </div>
            <div class="events-label">
                <h2>Upcoming workshops</h2>
                <p>Registration Form</p>
                <p>Speaker Interest Form</p>
            </div>
            <div>
                {upcomingEvents}
            </div>
            <div class="events-label">
                <h2>Previous Workshops</h2>
            </div>
            <div>
                {pastEvents}
            </div>
        </div>
    )
}

export default EventsPage;