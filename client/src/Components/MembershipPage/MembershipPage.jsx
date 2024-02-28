import React, { useState } from 'react';

import './MembershipPage.css';

import backgroundImg from '../../utils/images/membership-background.png';

function MembershipPage() {
  return(
    <div>
      <div class="title">
        <img src={backgroundImg} alt="Seattle skyline"></img>
        <div class="centered">
          <h1 class="title-text">Membership</h1>
          <p className={"caption-text"}>
            SHIMA Membership is annual. If you are unsure if you are currently a member, please feel free to email us.
          </p>
          <button class="apply-button">Apply now</button>
        </div>
      </div>
      <br></br>
      <div class="information-section"> 
        <div>
          <h2>Why join?</h2>
          <p class="caption">Here at SHIMA, we offer discounted workshops, professional development, networking opportunities, Inexpensive Continuing Education Units (CEUs), and volunteering to members.</p>
          <div id="annual-rates">
            <h3>Annual Rates</h3>
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
        <div>
          <h2>How to apply</h2>
          <h4>Online</h4>
          <p>
            Complete the 2024 SHIMA membership form.
            Once you have completed the membership form you will receive a confirmation email with a link to PayPal.
          </p>
          <button class="apply-button-2">Apply now</button>
          <h4>In-person</h4>
          <p>
            Attend one of our upcoming workshops and complete a new membership form.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MembershipPage;