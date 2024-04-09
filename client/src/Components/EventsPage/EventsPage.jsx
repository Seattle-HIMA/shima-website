import React, { useState } from 'react';
import backgroundImg from '../../utils/images/events-background.png';

import './EventsPage.css';

const EVENT_INFO = [
  {
    "title": "Successful Healthcare IT projects",
    "speaker": "Tabitha Lieberman",
    "description": "A renowned health IT leader, Tabitha Lieberman has more than 30 years of experience powering transformational implementations, digital integrations, and deployments.",
    "flyerSource": "flyer-1.png"
  }
]

function makeSection(title, speaker, description, flyer) {
  const flyerImg = require(`../../utils/images/${flyer}`);
  return (
    <div className={"event-section"}>
      <div className="section-image">
        <img src={flyerImg} alt="Event Flyer" />
      </div>
      <div className={"section-body"}>
        <h2 className={"section-title"}>
          {title}<br></br><span>by {speaker}</span>
        </h2>
        <p className={"section-description"}>{description}</p>
        <button>Click here</button>
      </div>
    </div>
  );

}

function EventsPage() {
  const eventSections= EVENT_INFO.map((item) => {
      const section = makeSection(item.title, item.speaker, item.description, item.flyerSource);
      return section;
  });

  return(
    <div>
      <div class="events-title">
        <img src={backgroundImg} alt="Rooftop view" id="events-img"></img>
        <div class="centered">
          <h1 class="events-h1">Workshops</h1>
          <p className={"caption-text"}>
            Upcoming workshops and events.
          </p>
        </div>
      </div>
      <div class="events-header">
        <h2>Upcoming workshops</h2>
        <p>Registration Form</p>
        <p>Speaker Interest Form</p>
      </div>
      <div>
        {eventSections}
      </div>
    </div>
  )
}


export default EventsPage;