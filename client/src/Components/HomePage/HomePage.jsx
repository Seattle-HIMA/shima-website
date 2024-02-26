import React, {useState} from 'react';

import './HomePage.css';

import seattleImg from '../../utils/images/space-needle-sunset.png';

const learnMoreButton = () => {
    console.log("you clicked the learn more button");
};

// will move into a json file later
const WHATWEDO = {
    "Opportunities": `Host workshops, panel disscussions, speakers, and
                        create networking opportunities.`,
    "Scholarships": `Provide Undergraduate and Graduate Scholarships for Health
                        Information Management and Informatics students.`,
    "Reimbursement": `Provide professional exam fee reimbursement for the AHIMA
                        credentials.`
}

function HomePage() {
    const whatWeDoCards = Object.keys(WHATWEDO).map((key) => {
        const card = makeCard(key, WHATWEDO[key]);
        return card;
    });

    return (
        <div>
            <div className={"title-section"}>
                <p className={"title-text"}>
                    Seattle Health Information Management Association
                </p>
                <p className={"description-text"}>
                    Welcome! We are a dedicated group of volunteers working to ensure that the Seattle Health
                    Information Management community has access to a network of professionals, engaging workshops and
                    scholarships.
                </p>
                <button className={"learn-more-button"} onClick={learnMoreButton}>Learn More</button>
            </div>
            <div className={"title-image"}>
                <img src={seattleImg} alt={"space needle sunset"}/>
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
    )
}

export default HomePage;
