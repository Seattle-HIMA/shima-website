import React, { useState } from 'react';
import './ScholarshipsPage.css'

import background from '../../utils/images/scholarships-page.jpg';

function ScholarshipsPage() {
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
    </div>
  )
}

export default ScholarshipsPage;