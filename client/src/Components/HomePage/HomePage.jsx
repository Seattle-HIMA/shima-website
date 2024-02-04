import React, {useState} from 'react';

import './HomePage.css';

import seattleImg from '../../utils/images/space-needle-sunset.png';

const learnMoreButton = () => {
    console.log("you clicked the learn more button");
};

function HomePage() {
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
        </div>
    );
}

export default HomePage;
