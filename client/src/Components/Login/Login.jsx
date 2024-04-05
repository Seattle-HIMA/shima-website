import React from 'react';

import './Login.css';
import cityImg from '../../utils/images/undraw_city_life_gnpr.svg';
import walkingImg from '../../utils/images/undraw_walking_outside_re_56xo.svg';

function Login() {
    return (
        <div className={"login-page-wrapper"}>
            <div className={"login-title"}>
                <div className={"login-title-text"}>Seattle Health Information Management Association</div>
                <img src={cityImg} alt={"walking in the city"} className={"cityImg"}/>
            </div>
            <div className={"login-box"}>
                <div className={"login-box-text"}>Log In</div>
                <div>
                    <p>Email</p>
                    <input/>
                </div>
                <div>
                    <p>Password</p>
                    <input/>
                </div>
                <p>Don't have an account? <a>Create Account Here</a></p>
                <img src={walkingImg} alt={"walking with the trees"} className={"walkingImg"}/>
            </div>
        </div>
    )
}

export default Login;