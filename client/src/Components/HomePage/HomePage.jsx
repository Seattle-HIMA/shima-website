import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import getPageDetails from '../../utils/utils';
import './HomePage.css';

import seattleImg from '../../utils/images/seattle-sunset-image.webp';
import seattleCompressed from '../../utils/images/seattle-sunset-image-compressed.webp';
import presidentImg from '../../utils/images/president-photo.png';

let pageInfo = await getPageDetails('homepage');
let sectionKeys = Object.keys(pageInfo.subsections);

const getTitleSection = (navigate, imageLoaded, setImageLoaded) => {
    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    return (<div className={"title-container"}>
        <div className={"title-text-container"}>
            <p className={"title-text"}>{pageInfo.title}</p>
            <p className={"description-text"}>{pageInfo.description}</p>
            <button className={"about-us-button"} onClick={() => navigate('/About')}>About Us
            </button>
        </div>
        <div className={"img-wrapper"}>
            {imageLoaded ? (<img
                    src={seattleImg}
                    alt={"space needle sunset"}
                    className={"seattle-sunset-image"}
                    onLoad={handleImageLoaded}
                    loading={"lazy"}
                />) : (<img
                    src={seattleCompressed}
                    alt={"compressed space needle sunset"}
                    className={"seattle-sunset-image"}
                    onLoad={handleImageLoaded}
                />)}
        </div>
    </div>);
};

const getBecomeAMemberSection = (navigate) => {
    const firstSection = pageInfo.subsections[sectionKeys[0]]
    return (<div>
        <p className={"become-member-text"}>{sectionKeys[0]}</p>
        <p className={"become-member-subtext"}>{firstSection.description}</p>
        <button className={"membership-button"} onClick={() => navigate('/Membership')}>Membership
        </button>
    </div>);
};

const makeCardText = (info, start, end, ulClass, liClass) => {
    let benefits = info.slice(start, end)

    return (<ul className={ulClass}>
            {benefits.map((benefit, index) => (<li className={liClass} key={index}>{benefit}</li>))}
        </ul>)
}

const getMembershipCards = () => {
    const secondSection = pageInfo.subsections[sectionKeys[1]];
    const thirdSection = pageInfo.subsections[sectionKeys[2]];

    const benefitsList = secondSection.text
    const eligibilityList = thirdSection.text

    return (<div className={"membership-cards-container"}>
        <div className={"membership-card"}>
            <div className={"membership-card-left"}>
                <p className={"membership-card-title"}>{sectionKeys[1]}</p>
                <p className={"membership-card-subtitle"}>{secondSection.description}</p>
            </div>
            <div>
                <div className={"membership-card-content membership-benefits-card-content"}>
                    {makeCardText(benefitsList, 0, 3, "benefits-list", "benefits-list-item")}
                    {makeCardText(benefitsList, 3, benefitsList.length, "benefits-list", "benefits-list-item")}
                </div>
            </div>
        </div>
        <div className={"membership-card"}>
            <div className={"membership-card-left"}>
                <p className={"membership-card-title"}>{sectionKeys[2]}</p>
                <p className={"membership-card-subtitle"}>{thirdSection.description}</p>
            </div>
            <div className={"membership-card-content membership-eligibility-card-content"}>
                {makeCardText(eligibilityList, 0, eligibilityList.length, "eligibility-list", "eligibility-list-item")}
            </div>
        </div>
    </div>);
};


const makeWhatWeDoCards = (navigate, name, content, img, link) => {
    return (<article className="what-we-do-card">
            <div className={"what-we-do-card-header-img"}
                 style={{backgroundImage: `url(${require(`../../utils/images/${img}`)})`}}></div>
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
        </article>);
}

const getLetterInfo = (content) => {
    return content.map((para, index) => (<p key={index}>{para}</p>));
}

const getLetterSection = () => {
    const letterSection = pageInfo.subsections[sectionKeys[4]];
    console.log(sectionKeys)
    const letterPar = letterSection.text

    return (<div className={"pres-letter"}>
            <img src={presidentImg} alt="president"></img>
            <div className={"letter"}>
                <h3>{sectionKeys[4]}</h3>
                {getLetterInfo(letterPar)}
                <p id="signature">{letterSection.signature}</p>
                <p>{letterSection.ending}</p>
            </div>
        </div>)
}

function HomePage(props) {
    const navigate = useNavigate();
    props.setShowFooter(true);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const [imageLoaded, setImageLoaded] = useState(false);

    const whatWeDoSection = pageInfo.subsections[sectionKeys[3]];
    const list = Object.keys(whatWeDoSection).slice(1);

    const whatWeDoCards = list.map((item) => {
        const cardInfo = whatWeDoSection[item];
        console.log(cardInfo);
        return makeWhatWeDoCards(navigate, item, cardInfo.description, cardInfo.image, cardInfo.link);
    });

    return (<div className={"home-page-wrapper"}>
        <div className={"title-section"}>
            {getTitleSection(navigate, imageLoaded, setImageLoaded)}
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
        {getLetterSection()}
    </div>);
}

export default HomePage;
