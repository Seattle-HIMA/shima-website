import React, {useState} from 'react';

import './HomePage.css';

import seattleImg from '../../utils/images/space-needle-sunset.png';

const aboutUsButton = () => {
    console.log("you clicked the about us button");
};

const getTitleSection = () => {
    return (
        <div>
            <p className={"title-text"}>
                Seattle Health Information Management Association
            </p>
            <p className={"description-text"}>
                Welcome! We are a dedicated group of volunteers working to ensure that the Seattle Health
                Information Management community has access to a network of professionals, engaging workshops and
                scholarships.
            </p>
            <button className={"about-us-button"} onClick={aboutUsButton}>About Us</button>
        </div>
    );
}

const getBecomeAMemberSection = () => {
    return (
        <div>
            <p className={"become-member-text"}>Become a member</p>
            <p className={"become-member-subtext"}>Join as a 2024 SHIMA member today.</p>
            <button className={"membership-button"}>Membership</button>
        </div>
    );
}

const getMembershipCards = () => {

}

// will move into a json file later
const WHATWEDO = {
    "Opportunities": `Host workshops, panel disscussions, speakers, and
                        create networking opportunities.`,
    "Scholarships": `Provide Undergraduate and Graduate Scholarships for Health
                        Information Management and Informatics students.`,
    "Reimbursement": `Provide professional exam fee reimbursement for the AHIMA
                        credentials.`
};

function HomePage() {
    const whatWeDoCards = Object.keys(WHATWEDO).map((key) => {
        const card = makeCard(key, WHATWEDO[key]);
        return card;
    });

    return (
        <div>
            <div className={"title-section"}>
                {getTitleSection()}
            </div>
            <div className={"title-image"}>
                <img src={seattleImg} alt={"space needle sunset"}/>
            </div>
            <div className={"become-a-member-section"}>
                {getBecomeAMemberSection()}
            </div>
            <div className={"membership-cards"}>
                {getMembershipCards()}
            </div>
            <div className={"what-we-do-section"}>
                <p className={"what-we-do-text"}>
                    What we do
                </p>
                <div className={"what-we-do-cards"}>
                    {whatWeDoCards}
                </div>
            </div>
        </div>
    );
}

function makeCard(name, content) {
    return (
        <div className={"what-we-do-card"}>
            <div className={"card-header"}>
                <p className={"img"}>insert image</p>
            </div>

            <div className={"card-body"}>
                <h2 className={"card-name"}>{name}</h2>
                <p className={"card-content"}>{content}</p>
            </div>
        </div>
    );
}

export default HomePage;
