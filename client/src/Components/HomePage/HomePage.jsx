import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './HomePage.css';

import seattleImg from '../../utils/images/seattle-sunset-image.jpg';
import presidentImg from '../../utils/images/president-photo.png';

const getTitleSection = (navigate) => {
    return (<div className={"title-container"}>
        <div className={"title-text-container"}>
            <p className={"title-text"}>
                Seattle Health Information Management Association
            </p>
            <p className={"description-text"}>
                Welcome! We are a dedicated group of volunteers working to ensure that the Seattle Health
                Information Management community has access to a network of professionals, engaging workshops and
                scholarships.
            </p>
            <button className={"about-us-button"} onClick={
                () => navigate('/About')
            }>About Us
            </button>
        </div>
        <div className={"img-wrapper"}>
            <img src={seattleImg} alt={"space needle sunset"} className={"seattle-sunset-image"}/>
        </div>
    </div>);
};

const getBecomeAMemberSection = (navigate) => {
    return (<div>
        <p className={"become-member-text"}>Become a member</p>
        <p className={"become-member-subtext"}>Join as a 2024 SHIMA member today.</p>
        <button className={"membership-button"} onClick={
            () => navigate('/Membership')
        }>Membership
        </button>
    </div>);
};

const getMembershipCards = () => {
    return (<div className={"membership-cards-container"}>
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
    </div>);
};

// will move into a json file later
const WHAT_WE_DO = [
    {
        "name": "Opportunities",
        "description": `Visit our workshops, participate in panel discussions,
                        meet our speakers, and join our events for more
                        networking opportunities.`,
        "image": require('../../utils/images/opportunities-photo.jpeg'),
        "link": '/Events'
    },
    {
        "name": "Scholarships",
        "description": `We provide Undergraduate and Graduate Scholarships for Health
                        Information Management and Informatics students.`,
        "image": require('../../utils/images/scholarships-photo.jpeg'),
        "link": '/Scholarships'
    },
    {
        "name": "Membership",
        "description": `We offer exclusive benefits including professional exam
                        fee reimbursement for AHIMA credentials.`,
        "image": require('../../utils/images/reimbursement-photo.jpeg'),
        "link": '/Membership'
    }];

function HomePage(props) {
    const navigate = useNavigate();
    props.setShowFooter(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const whatWeDoCards = WHAT_WE_DO.map((item) => {
        return makeCard(navigate, item.name, item.description, item.image, item.link);
    });

    return (<div className={"home-page-wrapper"}>
        <div className={"title-section"}>
            {getTitleSection(navigate)}
        </div>
        <div className={"become-a-member-section"}>
            {getBecomeAMemberSection(navigate)}
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
        <div className={"pres-letter"}>
            <img src={presidentImg} alt="president"></img>
            <div className={"letter"}>
                <h3>A letter from the President</h3>
                <p>
                    Hello, At the Seattle Health Information Management Association
                    (SHIMA), we extend scholarship opportunities to individuals pursuing
                    various certifications accredited by AHIMA. Our organization proudly
                    hosts engaging and informative workshops led by esteemed researchers
                    and professionals in the healthcare industry. These workshops not only
                    provide valuable knowledge but also contribute to Continuing Education
                    Units (CEUs), essential for the continuous development of your professional
                    certification.
                </p>
                <p>
                    SHIMA serves as a unique platform offering exceptional opportunities to
                    enhance your professional skills within a supportive and enjoyable environment.
                    Whether you are a student new to health information management or a seasoned
                    professional aiming to elevate your career, SHIMA provides a secure space to
                    pursue your overarching goals in the field. Our organizational focus
                    encompasses leadership development, organizational growth, and the acquisition
                    of technical skills.
                </p>
                <p>
                    We recognize that your active participation requires a personal time investment.
                    However, we assure you that SHIMA is poised to deliver one of the most substantial
                    returns on your time investment. The relevance of our initiatives is amplified by
                    your engagement and commitment.
                </p>
                <p>If you are interested in joining our community, please feel free to reach out to us.</p>
                <p>Thank you,</p>
                <p id="signature">Tien Nguyen</p>
                <p>SHIMA President</p>
            </div>
        </div>
    </div>);
}

function makeCard(navigate, name, content, img, link) {
    return (
        <article className="what-we-do-card">
            <div className={"what-we-do-card-header-img"} style={{backgroundImage: `url(${img})`}}></div>
            <div className={"what-we-do-card-body"}>
                <h2 className={"what-we-do-card-name"}>{name}</h2>
                <h3 className={"what-we-do-card-text"}>
                    {content}
                </h3>
                <h3 className={"what-we-do-card-arrow-button"} onClick={() => navigate(link)}>
                    <div className={"what-we-do-card-read-more-text"}>Read More</div>
                    <span className={"material-symbols-outlined"}>expand_circle_right</span>
                </h3>
            </div>
        </article>
    );
}

export default HomePage;
