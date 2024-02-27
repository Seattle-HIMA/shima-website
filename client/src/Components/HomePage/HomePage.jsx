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
            <div className={"pres-letter"}>
                <img src="" alt="president's photo"></img>
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
                    <p>Tien Nguyen</p>
                    <p>SHIMA President</p>
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
                <button>{'>'}</button>
            </div>
            <p className={"card-content"}>{content}</p>
        </div>
    )
}

export default HomePage;
