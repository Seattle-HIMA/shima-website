import React, { useEffect } from 'react';
import backgroundImg from '../../utils/images/events-background.png';

import './EventsPage.css';

const EVENT_INFO = [
  {
    "title": "Successful Healthcare IT projects",
    "speaker": "Tabitha Lieberman",
    "description": "A renowned health IT leader, Tabitha Lieberman has more than 30 years of experience powering transformational implementations, digital integrations, and deployments.",
    "flyerSource": "flyer-1.png",
  }, 
  {
    "title": "From Data Entry to Policy Input",
    "speaker": "Jim Condon",
    "description": "Dr. Jim Condon is an Associate Teaching Professor and Director of the Health Informatics and Health Information Management undergraduate and graduate programs at the University of Washington",
    "flyerSource": "flyer-2.png"
  },
  {
    "title": "Event 3",
    "speaker": "Speaker 3",
    "description": "description here",
    "flyerSource": "flyer-3.jpg"
  }
]

function makeSection(title, speaker, description, flyer, index) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  console.log("index:", index)
  const flyerImg = require(`../../utils/images/${flyer}`);
  const styleNum = index % 2 === 0 ? 1 : 2;
  console.log(styleNum)
  return (
    <div className={"event-section" + styleNum}>
      <div className={"section-image" + styleNum}>
        <img src={flyerImg} alt="Event Flyer" />
      </div>
      <div className={"section-body"+ styleNum}>
        <h2 className={"section-title"+ styleNum}>
          {title}<br></br><span>by {speaker}</span>
        </h2>
        <p className={"section-description" + styleNum}>{description}</p>
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

function EventsPage() {
  const eventSections= EVENT_INFO.map((item, index) => {
      const section = makeSection(item.title, item.speaker, item.description, item.flyerSource, index);
      return section;
  });

  return(
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
        {eventSections}
      </div>
      <div class="events-label">
        <h2>Previous Workshops</h2>
      </div>
    </div>
  )
}


export default EventsPage;