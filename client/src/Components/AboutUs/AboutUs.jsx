import React, {useEffect} from 'react';
import { useState } from 'react';

import './AboutUs.css'
import bg from '../../utils/images/board-members-bg.jpeg'
import linkedInIcon from '../../utils/images/board-members/linkedin-icon.png';


const MEMBER_INFO = [
    {
        "name": "Tien Nguyen",
        "position": "President",
        "degree": "B.S. Health Informatics & Health Information Management",
        "currentStatus": "Student in Master of Science in Business Analytics (Expected graduation 2025)",
        "about": "Tien holds a Bachelor of Science in Health Informatics and Health Information Management from the University of Washington. Currently, she is actively pursuing a Master's in Business Analytics at Seattle University. Since 2020, Tien has been a dedicated volunteer at SHIMA, driven by a strong passion for SHIMA's mission. She is enthusiastic about contributing to the professional growth of SHIMA and looks forward to playing a key role in its development.",
        "linkedinUrl": "https://www.linkedin.com/",
        "profileImg": "bm-1.png"
    },
    {
        "name": "Sandra Andrade",
        "position": "Secretary",
        "degree": "Degree",
        "currentStatus": "working",
        "about": "Sandra is a proven leader in revenue cycle management with extensive experience in coding, auditing, project management, training, and education. Sandra completed her graduate and undergraduate studies in Health Information Management at Texas State University. Her commitment in the HIM industry expands into higher education, where she teaches Medical Billing and Coding courses at Everett Community College.",
        "linkedinUrl": "",
        "profileImg": "bm-2.png"
    },
    {
        "name": "First Last",
        "position": "Position",
        "degree": "Degree",
        "currentStatus": "working",
        "about": "hi",
        "linkedinUrl": "",
        "profileImg": "bm-3.png"
    },
    {
        "name": "First Last",
        "position": "Position",
        "degree": "Degree",
        "currentStatus": "working",
        "about": "hi",
        "linkedinUrl": "",
        "profileImg": "bm-4.png"
    },
    {
        "name": "First Last",
        "position": "Position",
        "degree": "Degree",
        "currentStatus": "working",
        "about": "hi",
        "linkedinUrl": "",
        "profileImg": "bm-5.png"
    },
    {
        "name": "First Last",
        "position": "Position",
        "degree": "Degree",
        "currentStatus": "working",
        "about": "hi",
        "linkedinUrl": "",
        "profileImg": "bm-6.png"
    }
]

// Profile card component
function ProfileCard({ name, position, degree, currentStatus, about, linkedinUrl, profileImg }) {
    const imgSrc = require(`../../utils/images/board-members/${profileImg}`);
    const linkedInIcon = require(`../../utils/images/board-members/linkedin-icon.png`);
    const xButton = require(`../../utils/images/board-members/close-popup.png`);


    const [popupVisible, setPopupVisible] = useState(false);
    
    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };
    
    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div>
            <article className="member-profile-card">
                <img src={imgSrc} alt="profile" class="popup" onClick={togglePopup}/>
                {popupVisible && (
                    <div className="overlay" onClick={closePopup}></div>
                )}
                {popupVisible && (
                    <div class="popup-content">
                        <img id="pfp" src={imgSrc} alt="profile" class="popup-profile-photo"/>
                        <div class="text-content">
                            <div class="popup-title">
                                <p>{name}</p>
                                <a href={linkedinUrl}>
                                    <img id="linkedin-icon" src={linkedInIcon} alt="linkedin logo"/>
                                </a>
                                <img id="close-popup" src={xButton} alt="x button" class="top-right" onClick={togglePopup} />
                            </div>
                            <p>{degree}</p>
                            <p>{currentStatus}</p>
                            <p>About</p>
                            <p>{about}</p>
                        </div>
                    </div>
                )}
                <p className="member-name">{name}</p>
                <p className="member-position">{position}</p>
            </article>
        </div>
    );
}

function togglePopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    console.log("toggling")
}

function AboutUs(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const profileCards = MEMBER_INFO.map((item, index) => (
        <ProfileCard
            key={index}
            name={item.name}
            position={item.position}
            degree={item.degree}
            currentStatus={item.currentStatus}
            about={item.about}
            linkedinUrl={item.linkedinUrl}
            profileImg={item.profileImg}
        />
    ));
    return (
        <div className={"members-page"}>
            <div className={"header"}>
                <img src={bg}></img>
                <section>
                    <h1>Board Members</h1>
                    <p>Meet the 2024 team at SHIMA</p>
                </section>
            </div>
            <h1>Executive Board</h1>
            <div class="member-grid">
                {profileCards}
            </div>
            <h1>Volunteers</h1>
        </div>
    )
}

export default AboutUs;