import React from 'react';

import './Login.css';
import cityImg from '../../utils/images/undraw_city_life_gnpr.svg';

function Login() {
    return (
        <div className={"login-page-wrapper"}>
            <div className={"login-page-top-half"}>
                <div className={"login-title"}>
                    <img src={cityImg} alt={"walking in the city"} className={"cityImg"}/>
                    <div className={"login-title-text"}>Seattle Health Information <br /> Management Association</div>
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

                    <p className={"dont-have-account"}>Don't have an account?
                        <a className={"create-account-link"}>Create an account</a>
                    </p>

                    <button className={"login-submit-button"}>
                        <span>Log In</span>
                        <span></span>
                    </button>
                </div>
            </div>
            <hr className={"login-bottom-line"}/>
        </div>
    )
}

export default Login;