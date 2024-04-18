import React, { useEffect } from 'react';
import './MembershipPage.css';

import backgroundImg from '../../utils/images/membership-background.png';

function MembershipPage(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className="membership-title">
                <img src={backgroundImg} alt="Seattle skyline" id="membership-img"></img>
                <div className="membership-title-centered">
                    <h1 className="membership-h1">Membership</h1>
                    <p className={"caption-text"}>
                        SHIMA Membership is annual. If you are unsure if you are currently a member,
                        please feel free to email us.
                    </p>
                </div>
            </div>
            <br></br>
            <div className="information-section">
                <div>
                    <h2 className="membership-why-join-text">Why join?</h2>
                    <p className="membership-why-join-description">
                        Here at SHIMA, we offer discounted workshops, professional development,
                        networking opportunities, Inexpensive Continuing Education Units (CEUs), and volunteering to
                        members.
                    </p>
                    <div className="membership-annual-rates-section">
                        <h3 className="membership-annual-rates-text">Annual Rates</h3>
                        <div className="membership-page-rates-cards">
                            <div className="membership-page-price-box">
                                <p className="membership-page-price-text"><span className="membership-page-price-num">$5</span> / year</p>
                                <p className="membership-page-price-type">Student</p>
                            </div>
                            <div className="membership-page-price-box">
                                <p className="membership-page-price-text"><span className="membership-page-price-num">$20</span> / year</p>
                                <p className="membership-page-price-type">Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="membership-page-apply-section">
                    <div className="membership-page-apply-section-text">
                        <h2 className="membership-h2">How to apply</h2>
                        <h4>Online</h4>
                        <p className="membership-page-apply-section-subtext">
                            Complete the 2024 SHIMA membership form below <span>OR</span> by scanning
                            the
                            QR code.
                            Once you have completed the membership form you will receive a confirmation email with a
                            link to PayPal.
                        </p>
                        <button className="membership-page-apply-button">Apply</button>
                        <h4>In-person</h4>
                        <p className="membership-page-apply-section-subtext">
                            Attend one of our upcoming workshops and complete a new membership form.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipPage;