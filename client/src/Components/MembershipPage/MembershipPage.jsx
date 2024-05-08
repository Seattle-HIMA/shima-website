import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './MembershipPage.css';
import MembershipAppForm from './MembershipAppForm';

import backgroundImg from '../../utils/images/membership-background.png';
import qrImg from '../../utils/images/QR-code.png';

function MembershipPage(props) {
    props.setShowFooter(true);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div class="membership-page">
                <div class="header">
                    <img src={backgroundImg} alt="Seattle skyline"></img>
                    <section>
                        <h1 class="membership-h1">Membership</h1>
                        <p>
                            SHIMA Membership is annual. If you are unsure if you are currently a member, please feel free to
                            email us.
                        </p>
                    </section>
                </div>
            </div>
            <br></br>
            <div class="information-section">
                <div>
                    <h2 class="membership-h2">Why join?</h2>
                    <p class="caption">Here at SHIMA, we offer discounted workshops, professional development,
                        networking opportunities, Inexpensive Continuing Education Units (CEUs), and volunteering to
                        members.</p>
                    <div id="annual-rates">
                        <h3 class="membership-h3">Annual Rates</h3>
                        <div class="rates">
                            <div class="price-box">
                                <p class="price-text"><span class="price">$5</span> / year</p>
                                <p class="price-type">Student</p>
                            </div>
                            <div class="price-box">
                                <p class="price-text"><span class="price">$20</span> / year</p>
                                <p class="price-type">Professional</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="apply-section">
                    <div class="apply-text">
                        <h2 class="membership-h2">How to apply</h2>
                        <h4>Online</h4>
                        <p class="caption">
                            Complete the 2024 SHIMA membership form below <span class="bold">OR</span> by scanning the
                            QR code.
                            Once you have completed the membership form you will receive a confirmation email with a
                            link to PayPal.
                        </p>
                        <Link to="/application-form">
                            <button class="apply-button">Apply</button>
                        </Link>
                        <h4>In-person</h4>
                        <p class="caption">
                            Attend one of our upcoming workshops and complete a new membership form.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MembershipPage;