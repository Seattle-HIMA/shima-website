import React, { useEffect } from 'react';
import { useState } from 'react';

import './AboutUs.css'
import bg from '../../utils/images/board-members-bg.jpeg'


const MEMBER_INFO = [
    {
        "name": "Tien Nguyen",
        "position": "President",
        "degree": "B.S. Health Informatics & Health Information Management",
        "currentStatus": "Student in Master of Science in Business Analytics (Expected graduation 2025)",
        "about": `Tien holds a Bachelor of Science in Health Informatics and Health Information Management from the University of Washington.
            Currently, she is actively pursuing a Master's in Business Analytics at Seattle University.
            Since 2020, Tien has been a dedicated volunteer at SHIMA, driven by a strong passion for SHIMA's mission.
            She is enthusiastic about contributing to the professional growth of SHIMA and looks forward to playing a key role in its development.`,
        "linkedinUrl": "https://www.linkedin.com/in/tien-nguyen-rhia/",
        "profileImg": "tien-nguyen.jpg"
    },
    {
        "name": "Sandra Andrade",
        "position": "Secretary",
        "degree": "B.S. and M.S. in Health Information Management at Texas State University",
        "currentStatus": "",
        "about": `Sandra is a proven leader in revenue cycle management with extensive experience in coding, auditing, project management, training, and education.
            Sandra completed her graduate and undergraduate studies in Health Information Management at Texas State University.
            Her commitment in the HIM industry expands into higher education, where she teaches Medical Billing and Coding courses at Everett Community College.`,
        "linkedinUrl": "https://www.linkedin.com/in/sandra-andrade-823b8938/",
        "profileImg": "sandra-andrade.jpg"
    }, 
    {
        "name": "Harsha Velpula",
        "position": "Treasurer",
        "degree": "M.S. in Health informatics and Health Information Management, B.S. Dentistry ",
        "currentStatus": "",
        "about": `Harsha has a strong healthcare background, with a Master's degree in Health informatics and Health Information Management, Bachelor's degree in dentistry and experience in information management, data analysis, quality improvement.
            Harsha  believes that health IT and its innovations help to improve the quality of patient care. Harsha is excited to serve as SHIMA's Treasurer and contribute to members professional development.`,
        "linkedinUrl": "https://www.linkedin.com/in/harsha-velpula-mhihim-407656170/",
        "profileImg": "harsha-velpula.jpg"
    },
    {
        "name": "Dhanshri Deshmukh",
        "position": "Volunteer",
        "degree": "Masters Health Informatics and Health Information Management and Bachelor's degree focused on homeopathic Medicine",
        "currentStatus": "",
        "about": `Dhanashri (Shri) has strong Healthcare background with a Masters Health Informatics and Health Information Management and Bachelor's degree focused on homeopathic Medicine.
            Skilled in Administration, Project Mangement and Analystics, she strives for Quality Improvement and Patient Safety.
            She believes Health IT innovations will reduce human errors and ease operational workflows.She enjoys working as SHIMA treasurer and assist HIM professionals in achieving their goals.`,
        "linkedinUrl": "https://www.linkedin.com/in/dhanashri-deshmukh/",
        "profileImg": "dhanshri-deshmukh.jpg"
    },
    {
        "name": "Sumaiya Sabeeh",
        "position": "Volunteer",
        "degree": "Bachelors in Biochemistry, Masters in Biotechnology and Masters in Health Information Management",
        "currentStatus": "",
        "about": `Sumaiya Sabeeh has 6+ years  experience interpreting and analyzing data and is currently working as an Epidemiologist with Washington Health Care Authority.
            She has Bachelors in Biochemistry, Masters in Biotechnology and Masters in Health Information Management from the College of St. Scholastica (MN).
            She is excited to be the part of SHIMA and ready to explore opportunities in the field of healthcare.`,
        "linkedinUrl": "https://www.linkedin.com/in/sumaiya-sabeeh-ms-him-rhia/",
        "profileImg": "sumaiya-sabeeh.jpg"
    },
    {
        "name": "Bekele Babo",
        "position": "Volunteer",
        "degree": "Bachelor Health Informatics and health information Management from University of Washington, and a Bachelor of Science in Biology from Debub University",
        "currentStatus": "working",
        "about": `Bekele Babo has over 18 years experience as a healthcare provider.
            He has worked in a variety of health care settings, including hospitals and long-term care facilities. He currently works at Swedish Medical Center (Oncology), as Patient Care Technician.
            Bekele graduated with a Bachelor Health Informatics and health information Management from University of Washington, and a Bachelor of Science in Biology from Debub University.
            Bekele enjoys volunteering with SHIMA to explore networking opportunities and stay updated on the ever changing industry. Bekele plans to become a RHIA soon.`,
        "linkedinUrl": "https://www.linkedin.com/in/bekele-babo-17401034/",
        "profileImg": "bekele-babo.jpg"
    },
    {
        "name": "Jennifer Kim",
        "position": "Volunteer",
        "degree": "Bachelor's of Science in Health Informatics and Health Information Management",
        "currentStatus": "",
        "about": `Jennifer is currently working in healthcare finance. She has a Bachelor's of Science in Health Informatics and Health Information Management.
            She has experience in clinical healthcare and in the medical-legal industry. 
            She is passionate about healthcare quality improvement, enhanced patient experience and distribution of high-quality care for diverse communities.
            She is delighted to contribute to SHIMA, as she continues to advance her career in healthcare.`,
        "linkedinUrl": "https://www.linkedin.com/in/jennifer-c-kim/",
        "profileImg": "jennifer-kim.jpg"
    }
]

// ProfileButton card component
function ProfileCard({name, position, degree, currentStatus, about, linkedinUrl, profileImg}) {
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

    return (<div>
            <article className="member-profile-card">
                <img src={imgSrc} alt="profile" className="popup square-image" onClick={togglePopup}/>
                {popupVisible && (<div className="overlay" onClick={closePopup}></div>)}
                {popupVisible && (<div className="popup-content">
                        <img id="pfp" src={imgSrc} alt="profile" className="popup-profile-photo"/>
                        <div className="text-content">
                            <div className="popup-title">
                                <p>{name}</p>
                                <a href={linkedinUrl} rel="noreferrer" target="_blank">
                                    <img id="linkedin-icon" src={linkedInIcon} alt="linkedin logo"/>
                                </a>
                                <img id="close-popup" src={xButton} alt="x button" className="top-right"
                                     onClick={togglePopup}/>
                            </div>
                            <p>{degree}</p>
                            <p>{currentStatus}</p>
                            <p>About</p>
                            <p>{about}</p>
                        </div>
                    </div>)}
                <p className="member-name">{name}</p>
                <p className="member-position">{position}</p>
            </article>
        </div>);
}

function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const profileCards = MEMBER_INFO.map((item, index) => (<ProfileCard
            key={index}
            name={item.name}
            position={item.position}
            degree={item.degree}
            currentStatus={item.currentStatus}
            about={item.about}
            linkedinUrl={item.linkedinUrl}
            profileImg={item.profileImg}
        />));

    return (<div className={"board-members-page"}>
            <div className={"header"}>
                <img src={bg} alt={"member page header"}></img>
                <section>
                    <h1>Board Members</h1>
                    <p>Meet the 2024 team at SHIMA</p>
                </section>
            </div>
            <h2>Executive Board</h2>
            <div className="member-grid">
                {profileCards}
            </div>
        </div>)
}

export default AboutUs;