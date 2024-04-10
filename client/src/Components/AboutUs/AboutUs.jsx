import React, { useEffect } from 'react';
import './AboutUs.css'
import bg from '../../utils/images/board-members-bg.jpeg'

function AboutUs(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={"members-page"}>
            <div className={"header"}>
                <img src={bg}></img>
                <section>
                    <h1>Board Members</h1>
                    <p>Meet the 2024 team at SHIMA</p>
                </section>
            </div>
        </div>
    )
}

export default AboutUs;