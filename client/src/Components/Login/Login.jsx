import React from 'react';

import './Login.css';
import cityImg from '../../utils/images/undraw_city_life_gnpr.svg';
import googleLogo from '../../utils/icons/google_signin_light.svg'
import microsoftLogo from '../../utils/icons/ms-symbollockup_signin_light.svg'

function Login(props) {
    props.setShowFooter(false);

    return (
        <div className={"login-page-wrapper"}>
            <div className={"login-title"}>
                <img src={cityImg} alt={"walking in the city"} className={"cityImg"}/>
                <div className={"login-title-text"}>Seattle Health Information <br/> Management Association</div>
            </div>

            <div className={"login-box"}>
                <div className={"login-box-text"}>Log In</div>

                <div className={"login-email-wrapper"}>
                    <p className={"login-email-label"}>Email</p>
                    <input className={"login-email-input"}/>
                </div>
                <div className={"login-password-wrapper"}>
                    <p className={"login-password-label"}>Password</p>
                    <input className={"login-password-input"}/>
                </div>

                <div className={"login-forgot-password"}>
                    <a className={"login-forgot-password-text"}>Forgot Password</a>
                </div>

                <button className={"login-submit-button"}>
                    <span>Log In</span>
                    <span></span>
                </button>

                <div className={"login-or-section"}>
                    <hr className={"login-or-line"}/>
                    <p className={"login-or-text"}>or</p>
                </div>

                <div className={"login-with-google"}>
                    <button className={"gsi-material-button"}>
                        <div className={"gsi-material-button-state"}></div>
                        <div className={"gsi-material-button-content-wrapper"}>
                            <div className={"gsi-material-button-icon"}>
                                <img src={googleLogo} alt={"google logo"}/>
                            </div>
                            <span className={"gsi-material-button-contents"}>Sign in with Google</span>
                        </div>
                    </button>
                </div>

                <div className={"login-with-microsoft"}>
                    <button className={"gsi-material-button"}>
                        <div className={"gsi-material-button-state"}></div>
                        <div className={"gsi-material-button-content-wrapper"}>
                            <div className={"gsi-material-button-icon"}>
                                <img className={"login-microsoft-logo"} src={microsoftLogo} alt={"msft logo"}/>
                            </div>
                            <span className={"msft-button-contents"}>Sign in with Microsoft</span>
                        </div>
                    </button>
                </div>

                <p className={"dont-have-account"}>Don't have an account?
                    <a className={"create-account-link"}>Sign Up</a>
                </p>

            </div>
        </div>
    )
}

export default Login;