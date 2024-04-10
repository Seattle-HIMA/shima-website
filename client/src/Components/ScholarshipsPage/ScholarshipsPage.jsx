import React, { useState } from 'react';
import './ScholarshipsPage.css'

import background from '../../utils/images/scholarships-page.jpg';
import winner1 from "../../utils/images/winner1.png"
import winner2 from "../../utils/images/winner2.png"
import winner3 from "../../utils/images/winner3.png"
import winner4 from "../../utils/images/winner4.png"

// data to be added to a json file later
const SCHOLARSHIPS = {
  "Exam Reimbursement Scholarship": {
    "description": `The Exam Reimbursement Scholarship rewards professionals
                      looking to excel their HIM careers by further credentialing
                      themselves. `,
    "winner": ["Tien Nguyen", "Kirshauna Day", "Eliot Sipes"]
    },
  "Graduate Scholarship": {
    "description": `The Graduate Scholarship rewards the HIM students/professionals who
                      show exemplary efforts in HIM profession. `,
    "winner": ["Mingjing Feng"]
  }
}

const WINNER = {
  "Tien Nguyen": {
    "year": "2022",
    "photo": winner1,
    "description": [`Tien graduated from the University of Washington with a Bachelor of
                      Science in Health Informatics and Health Information Management. She
                      is also an active volunteer of SHIMA and facilitates many workshops from
                      2020 until now. She is very grateful to be the winner of the SHIMA Exam
                      Reimbursement Scholarship 2022 and she would love to devote more effort
                      to the HIM community.`]
  },
  "Kirshauna Day": {
    "year": "2022",
    "photo": winner2,
    "description": [`"Thank you, Seattle Health Information Management Association for this
                      opportunity in becoming a Certified Coding Associate. Being a Certified
                      Coding Associate has only inspired me to further my education. With
                      excitement, I will soon complete my Registered Health Information
                      Technology degree this upcoming year."`]
  },
  "Eliot Sipes": {
    "year": "2018",
    "photo": winner3,
    "description": [`Eliot graduated from the University of Washington with a B.S. degree
                      in Health Informatics and Health Information Management. His interests
                      in technology and the advancements of EMR's lead him to the HIM field.
                      Throughout the HIHIM program, Eliot helped both classmates and professors
                      with computer issues; earning him the nickname IT guy. He will continue
                      working in HIM and improving his IT skills on the side. Eventually he plans
                      to work for an EMR company and improve the user experience for employees and`,
                    `Eliot is currently working at Equinox Primary Care as their Medical Records
                      lead. In his free time he enjoys drawing, filming videos, and weightlifting.
                      He is grateful for the classmates, professors, and colleagues he met in the 2
                      years of HIHIM and SHIMA. He would like to thank SHIMA for offering this
                      scholarship and the hard work invested to keep the Seattle HIM community
                      together.`]
  },
  "Mingjing Feng": {
    "year": "2017",
    "photo": winner4,
    "description": [`Mingjing is a graduate student of Health Informatics and Health
                      Information Management (MHIHIM) Program at University of Washington.
                      She obtained her bachelor's degree in life science at Shandong University
                      and master's degree in biochemistry and molecular biology at Peking
                      University. She's maintained top academic standards and has done several
                      research projects in life science and clinical research. She actively
                      participated in other activities, such as national business plan competition
                      and public health legislation education in Olympia.`,

                    `With experience in both research and health informatics, she would like to
                      find a way to utilize precious research findings for clinical care and
                      unlock the power of patient data, realizing real-time and more precise
                      clinical decision making. Meanwhile, she will devote herself to public
                      health and healthcare system improvement. Lastly, Minjing thanks SHIMA for
                      awarding her the honor, and really appreciates their efforts to help HIM
                      professionals and improve health care. She would love to do more volunteer
                      work and devote more efforts to the HIM community.`]
  }
}

function ScholarshipsPage() {
  const scholarshipsInfo = Object.keys(SCHOLARSHIPS).map((key) => {
    return (
      <div className={"scholarship-info"}>
        <h3>{key}</h3>
        <p>{SCHOLARSHIPS[key].description}</p>
      </div>
    )
  });

  const winnerCards = Object.keys(SCHOLARSHIPS).map((key) => {
    const winners = SCHOLARSHIPS[key].winner
    const winnerCard = winners.map((winner) => {
      return makeWinnerSection(winner, key, WINNER[winner].year, WINNER[winner].photo, WINNER[winner].description)
    })

    return winnerCard
  })

  return(
    <div className={"scholarships-section"}>
      <div className={"scholarships-header"}>
        <img src={background} alt="library view"></img>
        <section>
          <h1>Scholarships</h1>
          <p>
            Seattle Health Information Management Association offers scholarship
            opportunities for students and professionals for demonstration of
            excellence and potential leadership in the Health Information Management
            industry
          </p>
        </section>
      </div>

      <div className={"winner-section"}>
        <h2>Meet our scholarship winners</h2>
        {winnerCards}
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

function makeWinnerSection(winner, scholarship, winYear, photo, details) {
  let name = scholarship.split("Scholarship")

    const description = details.map((para) => {
      return <p className={"long-desc"}>{para}</p>
    })

  return (
    <div className={"winner-details"}>
      <img src={photo} alt="winner photo"></img>
      <div className={"winner-info"}>
        <h3>{winner}</h3>
        <p className={"short-desc"}>{name[0]} {winYear} Scholarship Winner</p>
        {description}
      </div>
    </div>
  )

}

export default ScholarshipsPage;