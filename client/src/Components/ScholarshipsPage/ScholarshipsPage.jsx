import React, { useState } from 'react';
import './ScholarshipsPage.css'

import background from '../../utils/images/scholarships-page.jpg';

// data to be added to a json file later
const SCHOLARSHIPS = {
  "Exam Reimbursement Scholarship": `The Exam Reimbursement Scholarship rewards professionals
                                      looking to excel their HIM careers by further credentialing
                                      themselves. `,
  "Graduate Scholarship": `The Graduate Scholarship rewards the HIM students/professionals who
                            show exemplary efforts in HIM profession. `
}

function ScholarshipsPage() {
  const scholarshipsInfo = Object.keys(SCHOLARSHIPS).map((key) => {
    return (
      <div className={"scholarship-info"}>
        <h3>{key}</h3>
        <p>{SCHOLARSHIPS[key]}</p>
      </div>
    )
  })
  return(
    <div className={"scholarships-section"}>
      <div className={"scholarships-header"}>
        <div className={"title"}>
          <h1>Scholarships</h1>
          <p>
            View scholarship winners for the Exam Reimbursement Scholarship
            and Graduate Scholarship.
          </p>
        </div>
        <img src={background} alt="library view"></img>
      </div>

      <div className={"about-our-scholarships"}>
        <h2>About our Scholarships</h2>
        <div className={"details"}>
          {scholarshipsInfo}
        </div>
      </div>
    </div>
  )
}

export default ScholarshipsPage;