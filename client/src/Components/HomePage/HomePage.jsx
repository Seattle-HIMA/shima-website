import React, {useState} from 'react';

import './HomePage.css';

import seattleImg from '../../utils/images/seattle-sunset-image.webp';

const aboutUsButton = () => {
    console.log("you clicked the about us button");
};

const getTitleSection = () => {
    return (
        <div className={"title-container"}>
            <div className={"title-text-container"}>
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
            <div className={"img-wrapper"}>
                <img src={seattleImg} alt={"space needle sunset"} className={"seattle-sunset-image"}/>
            </div>
        </div>
    );
};

const getBecomeAMemberSection = () => {
    return (
        <div>
            <p className={"become-member-text"}>Become a member</p>
            <p className={"become-member-subtext"}>Join as a 2024 SHIMA member today.</p>
            <button className={"membership-button"}>Membership</button>
        </div>
    );
};

const getMembershipCards = () => {
    return (
        <div className={"membership-cards-container"}>
            <div className={"membership-card"}>
                <div className={"membership-card-left"}>
                    <p className={"membership-card-title"}>Benefits</p>
                    <p className={"membership-card-subtitle"}>What we offer.</p>
                </div>
                <div>
                    <div className={"membership-card-content membership-benefits-card-content"}>
                        <ul className={"benefits-list"}>
                            <li className={"benefits-list-item"}>Scholarships</li>
                            <li className={"benefits-list-item"}>
                                Inexpensive Continuing Education Units (CEUs) to maintain your professional
                                certification
                            </li>
                            <li className={"benefits-list-item"}>Low membership fees</li>
                        </ul>
                        <ul className={"benefits-list"}>
                            <li className={"benefits-list-item"}>Networking</li>
                            <li className={"benefits-list-item"}>Professional and personal development</li>
                            <li className={"benefits-list-item"}>Stay up-to-date on information management and
                                informatics
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"membership-card"}>
                <div className={"membership-card-left"}>
                    <p className={"membership-card-title"}>Eligibility</p>
                    <p className={"membership-card-subtitle"}>Who should join.</p>
                </div>
                <div className={"membership-card-content membership-eligibility-card-content"}>
                    <ul className={"eligibility-list"}>
                        <li className={"eligibility-list-item"}>
                            <span>
                                Current and future professionals interested in the intersection between people, data and
                                technology
                            </span>
                        </li>
                        <li className={"eligibility-list-item"}>
                            <span>
                                Professionals working formally or informally in a Health Information Management (HIM) or
                                healthcare informatics role
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

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
            <div className={"become-a-member-section"}>
                {getBecomeAMemberSection()}
            </div>
            <div className={"membership-cards-section"}>
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
