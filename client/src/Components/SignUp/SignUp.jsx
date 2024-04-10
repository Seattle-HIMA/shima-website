import React from 'react';

import './SignUp.css';
import cityImg from '../../utils/images/undraw_city_life_gnpr.svg';
import googleLogo from "../../utils/icons/google_signin_light.svg";
import microsoftLogo from "../../utils/icons/ms-symbollockup_signin_light.svg";

function SignUp(props) {
    props.setShowFooter(false);

    return (
        <div className={"signup-page-wrapper"}>
            <div className={"signup-title"}>
                <img src={cityImg} alt={"walking in the city"} className={"cityImg"}/>
                <div className={"signup-title-text"}>Seattle Health Information <br/> Management Association</div>
            </div>

            <div className={"signup-box"}>
                <div className={"signup-box-text"}>Sign Up</div>

                <div className={"signup-fullname-wrapper"}>
                    <p className={"signup-fullname-label"}>Full Name</p>
                    <input className={"signup-fullname-input"}/>
                </div>
                <div className={"signup-email-wrapper"}>
                    <p className={"signup-email-label"}>Email</p>
                    <input className={"signup-email-input"}/>
                </div>
                <div className={"signup-password-wrapper"}>
                    <p className={"signup-password-label"}>Password</p>
                    <input className={"signup-password-input"}/>
                </div>

                <button className={"signup-submit-button"}>
                    <span>Create an Account</span>
                    <span></span>
                </button>

                <div className={"signup-or-section"}>
                    <hr className={"signup-or-line"}/>
                    <p className={"signup-or-text"}>or</p>
                </div>

                <div className={"signup-with-google"}>
                    <button className={"gsi-material-button"}>
                        <div className={"gsi-material-button-state"}></div>
                        <div className={"gsi-material-button-content-wrapper"}>
                            <div className={"gsi-material-button-icon"}>
                                <img src={googleLogo} alt={"google logo"}/>
                            </div>
                            <span className={"gsi-material-button-contents"}>Sign up with Google</span>
                        </div>
                    </button>
                </div>

                <div className={"signup-with-microsoft"}>
                    <button className={"gsi-material-button"}>
                        <div className={"gsi-material-button-state"}></div>
                        <div className={"gsi-material-button-content-wrapper"}>
                            <div className={"gsi-material-button-icon"}>
                                <img className={"signup-microsoft-logo"} src={microsoftLogo} alt={"msft logo"}/>
                            </div>
                            <span className={"msft-button-contents"}>Sign up with Microsoft</span>
                        </div>
                    </button>
                </div>

                <p className={"already-have-account"}>Already have an account?
                    <a className={"sign-into-account-link"}>Log In</a>
                </p>

            </div>
        </div>
    )
}

export default SignUp;