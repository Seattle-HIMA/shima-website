import React, { useEffect } from 'react';
import { useState } from 'react';
import {statusCheck} from './../../utils/utils.js';
import './AboutUs.css'
import bg from '../../utils/images/board-members-bg.jpeg'

let MEMBER_INFO;

async function getMembersInfo() {
    try {
        let res = await fetch('/routes/members');
        await statusCheck(res);
        res = await res.json();
        MEMBER_INFO = res;
    }catch(err){
        console.log(err);
    }
}

await getMembersInfo();

// ProfileButton card component
function ProfileCard(memberObj) {
    let member = memberObj.memberObj;
    const imgSrc = require(`../../utils/images/board-members/${member.imageURL}`);
    const linkedInIcon = require(`../../utils/images/board-members/linkedin-icon.png`);
    const xButton = require(`../../utils/images/board-members/close-popup.png`);


    const [popupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    let memberName = member.firstName + " " + member.lastName;

    const makeDegreeText = () => {
        const degrees = member.degree.map((degree, index) => {
            return(
                <em key={index}>{degree}</em>
            )
        });

        return degrees;
    }

    return (
        <div className="member-profile-card">
            <div className="card-photo">
                <img src={imgSrc} alt="profile" className="popup square-image" onClick={togglePopup}/>
                {popupVisible && (<div className="overlay" onClick={closePopup}></div>)}
                {popupVisible && (<div>
                    <div className="popup-content">
                        <img id="popup-profile-photo" src={imgSrc} alt="profile" className="popup-profile-photo"/>
                        <div className="text-content">
                            <div className="popup-title">
                                <div>
                                    <h3>{memberName}</h3>
                                    <a href={member.linkedIn} rel="noreferrer" target="_blank">
                                        <img id="linkedin-icon" src={linkedInIcon} alt="linkedin logo"></img>
                                    </a>
                                </div>
                                <img id="close-popup" src={xButton} alt="x button" className="top-right"
                                    onClick={togglePopup}></img>
                            </div>
                            {makeDegreeText()}
                            <p>{member.currJob}</p>
                            <div className="about-section">
                                <h4>About</h4>
                                <p>{member.about}</p>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="card-content">
                <h2>{memberName}</h2>
                <p>{member.position.toUpperCase()}</p>
            </div>
        </div>);
}

function AboutUs() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const profileCards = MEMBER_INFO.map((item, index) => {
        return <ProfileCard
            key={index}
            memberObj={item}/>
        });

    return (<div className={"board-members-page"}>
            <div className={"header"}>
                <img src={bg} alt={"member page header"}></img>
                <section>
                    <h1>Board Members</h1>
                    <p>Meet the 2024 team at SHIMA</p>
                </section>
            </div>
            <div className="member-profile-card-container">
                {profileCards}
            </div>
        </div>)
}

export default AboutUs;