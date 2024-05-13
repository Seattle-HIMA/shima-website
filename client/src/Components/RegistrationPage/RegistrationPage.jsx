import React, { useEffect, useState } from 'react';
// import {useNavigate} from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';

import './RegistrationPage.css';

const EVENT_INFO = [{
    "title": "Successful Healthcare IT projects",
    "speaker": "Tabitha Lieberman",
    "description": "A renowned health IT leader, Tabitha Lieberman has more than 30 years of experience powering transformational implementations, digital integrations, and deployments.",
    "flyerSource": "flyer-1.png",
    "date": "2023-10-21"
}, {
    "title": "From Data Entry to Policy Input",
    "speaker": "Jim Condon",
    "description": "Dr. Jim Condon is an Associate Teaching Professor and Director of the Health Informatics and Health Information Management undergraduate and graduate programs at the University of Washington",
    "flyerSource": "flyer-2.png",
    "date": "2023-11-18"
}, {
    "title": "Event 3",
    "speaker": "Speaker 3",
    "description": "description here",
    "flyerSource": "flyer-3.jpg",
    "date": "2025-04-21"
}, {
    "title": "Spheres & Shades",
    "speaker": "Isaac Gribben",
    "description": "A Look Into The Venn Diagram Of Differing Aspects Of Clinical Operations And Risk Stratification",
    "flyerSource": "spheres-and-shades.jpg",
    "date": "2024-05-04"
}

]

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
        <h2>Registration Form</h2>
        <div className="registration-page-form">
            <form onSubmit={handleSubmit}>
                <div className="registration-page-form-group">
                    <label className="registration-form-label" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName}
                           onChange={handleInputChange} required/>
                </div>
                <div className="registration-page-form-group">
                    <label className="registration-form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName}
                           onChange={handleInputChange} required/>
                </div>
                <div className="registration-page-form-group">
                    <label className="registration-form-label" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                           required/>
                </div>
                <div className="registration-page-form-group">
                    <label className="registration-form-label" htmlFor="workshop">Workshop Name</label>
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
                    <input type="radio" id="payment1" name="payment" value="paypal"
                           checked={formData.payment === 'paypal'} onChange={handleInputChange} required/>
                    <label className="radio-label registration-form-label" htmlFor="payment1">Pay with PayPal using this
                        link:
                        PayPal</label><br/>
                    <input type="radio" id="payment2" name="payment" value="zelle"
                           checked={formData.payment === 'zelle'} onChange={handleInputChange}/>
                    <label className="radio-label registration-form-label" htmlFor="payment2">Pay with Zelle:
                        info.seattlehima@gmail.com</label><br/>
                    <input type="radio" id="payment3" name="payment" value="stripe"
                           checked={formData.payment === 'stripe'} onChange={handleInputChange}/>
                    <label className="radio-label registration-form-label" htmlFor="payment3">Pay with Stripe</label>
                </div>
                <button className={"registration-form-button"} type="submit">Submit</button>
            </form>
        </div>
    </div>);
}

export default RegistrationPage;