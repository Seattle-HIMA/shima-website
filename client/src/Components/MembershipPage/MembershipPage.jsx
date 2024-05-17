import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MembershipPage.css';

import backgroundImg from '../../utils/images/membership-background.png';

function MembershipPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="membership-page">
            <div className="header">
                <img src={backgroundImg} alt="Seattle skyline" id="membership-img"></img>
                <section>
                    <h1>Membership</h1>
                    <p className={"caption-text"}>SHIMA Membership is annual. If you are unsure if you are currently a
                        member,
                        please feel free to email us.</p>
                </section>
            </div>
            <br></br>
            <div className="information-section">
                <h2>Why join?</h2>
                <p className="membership-why-join-description">
                    Here at SHIMA, we offer discounted workshops, professional development,
                    networking opportunities, Inexpensive Continuing Education Units (CEUs), and volunteering to
                    members.
                </p>
                <div className="annual-rates-section">
                    <h3>Annual Rates</h3>
                    <div className="membership-page-rates-cards">
                        <div className="membership-page-price-box">
                            <p className="membership-page-price-text">
                                <span>$10</span> / year</p>
                            <p className="membership-page-price-type">Student</p>
                        </div>
                        <div className="membership-page-price-box">
                            <p className="membership-page-price-text">
                                <span>$25</span> / year</p>
                            <p className="membership-page-price-type">Professional</p>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            <div className="apply-section">
                <h2>How to apply</h2>
                <h4>Online</h4>
                <p>
                    Apply for membership on the 2024 SHIMA membership form by logging into your SHIMA account and
                    completing the application form, including payment.
                    Once you have completed the membership form, you will receive a confirmation email.
                </p>
                <Link to="/application-form">
                    <button className="membership-page-apply-button">Apply</button>
                </Link>
                <h4>In-person</h4>
                <p>
                    Attend one of our upcoming workshops and complete a new membership form.
                </p>
            </div>
        </div>);
}

export default MembershipPage;