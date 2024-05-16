import React, { useEffect } from 'react';
import './ScholarshipsPage.css'
import {getPageDetails} from '../../utils/utils';

import background from '../../utils/images/scholarships-page.jpg';

let pageInfo = await getPageDetails('scholarships');
let sectionKeys = Object.keys(pageInfo.subsections);

function ScholarshipsPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // get scholarships details and info
    let scholarshipSection = pageInfo.subsections[sectionKeys[0]];
    let details = Object.keys(scholarshipSection).slice(1);

    const scholarshipsInfo = details.map((key) => {
        return (
            <div className={"scholarship-info"}>
                <h3>{key}</h3>
                <p>{scholarshipSection[key].description}</p>
            </div>
        )
    });


    // get winners information
    let winnersSection = pageInfo.subsections[sectionKeys[1]];
    let winners = Object.keys(winnersSection).slice(1);

    const winnerCards = winners.map((winner) => {
        let scholarship = winnersSection[winner].scholarship;
        let photo = winnersSection[winner].photo;
        let desc = winnersSection[winner].description;

        const description = desc.map((para) => {
            return <p className={"long-desc"}>{para}</p>
        })

        return (
            <div className={"winner-details"}>
                <img src={require(`../../utils/images/${photo}`)} alt="winner photo"></img>
                <div className={"winner-info"}>
                    <h3>{winner}</h3>
                    <p className={"short-desc"}>{scholarship}</p>
                    {description}
                </div>
            </div>
        )
    })

    return (
        <div className={"scholarships-section"}>
            <div className={"header"}>
                <img src={background} alt="library view"></img>
                <section>
                    <h1>{pageInfo.title}</h1>
                    <p>{pageInfo.description}</p>
                </section>
            </div>

            <div className={"about-our-scholarships"}>
                <h2>{scholarshipSection.description}</h2>
                <div className={"details"}>
                    {scholarshipsInfo}
                </div>
            </div>

            <div className={"winner-section"}>
                <h2>{scholarshipSection.description}</h2>
                {winnerCards}
            </div>
        </div>
    )
}

export default ScholarshipsPage;