import React, { useEffect, useState } from 'react';
// import {useNavigate} from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';

import './RegistrationPage.css';

function RegistrationPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // radio buttons
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', workshop: 'workshop1', payment: 'credit_card'
    });
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (<div className="registration-page">
        <div className="header">
            <img src={backgroundImg} alt="Rooftop view"></img>
            <section>
                <h1>Workshops</h1>
                <p className={"caption-text"}>Upcoming workshops and events.</p>
            </section>
        </div>
        <div className="registration-page-form">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className={"form-section"}>
                    <h3>Personal Information</h3>
                    <div className={"name-info"}>
                        <div className='left-side name-input'>
                            <label for="fname">First Name</label>
                            <input type="text" name="fname" id="fname" value={formData.firstName}
                                onChange={handleInputChange} required/>
                        </div>
                        <div className='name-input'>
                            <label for="lname">Last Name</label>
                            <input type="text" name="lname" id="lname" value={formData.lastName}
                                onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className={"email-info"}>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email}
                            onChange={handleInputChange} required/>
                    </div>
                </div>

                <div className="registration-page-form-group">
                    <h3>Workshop Name</h3>
                    <select id="workshop" name="workshop" value={formData.workshop} onChange={handleInputChange}
                            required>
                        {/* to update w actual workshops */}
                        <option value="workshop1">Workshop 1</option>
                        <option value="workshop2">Workshop 2</option>
                        <option value="workshop3">Workshop 3</option>
                    </select>
                </div>

                <div className="registration-page-form-group">
                    <label className="registration-form-label">Payment</label><br/>
                    <p>Members: $15</p>
                    <p>Non - Members: $25</p>
                </div>
                <button className={"registration-form-button"} type="submit">Pay with Stripe</button>
            </form>
        </div>
    </div>);
}

export default RegistrationPage;