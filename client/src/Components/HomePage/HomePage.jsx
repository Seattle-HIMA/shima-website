import React, {useState} from 'react';

import './HomePage.css';

function HomePage() {
    return (
        <div className={"title-section"}>
            <p className={"title-text"}>
                Seattle Health Information Management Association
            </p>
            <p className={"description-text"}>
                Welcome! We are a dedicated group of volunteers working to ensure that the Seattle HIM community has
                access to a network of professionals, engaging workshops and scholarships.
            </p>
        </div>
    );
}

export default HomePage;
