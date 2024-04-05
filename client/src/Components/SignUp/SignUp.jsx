import React from 'react';

import './SignUp.css';
import cityImg from '../../utils/images/undraw_city_life_gnpr.svg';

function SignUp() {
    return (
        <div className={"signup-page-wrapper"}>
            <div className={"signup-title"}>
                <div className={"signup-title-text"}>Seattle Health Information Management Association</div>
                <img src={cityImg} alt={"walking in the city"} className={"cityImg"}/>
            </div>
            <div className={"signup-box"}>
                <div className={"signup-box-text"}>Create an account</div>

                <div className={"signup-name-wrapper"}>
                    <p className={"signup-name-label"}>Full Name</p>
                    <input className={"signup-name-input"}/>
                </div>
                <div className={"signup-email-wrapper"}>
                    <p className={"signup-email-label"}>Email</p>
                    <input className={"signup-email-input"}/>
                </div>
                <div className={"signup-password-wrapper"}>
                    <p className={"signup-password-label"}>Password</p>
                    <input className={"signup-password-input"}/>
                </div>

                <p className={"already-have-account"}>Already have an account?
                    <a className={"log-into-account-link"}>Log In</a>
                </p>

                <button className={"signup-submit-button"}>
                    <span>Sign Up</span>
                    <span></span>
                </button>
            </div>
        </div>
    )
}

export default SignUp;