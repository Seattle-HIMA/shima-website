import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';
import { useAuth0 } from "@auth0/auth0-react";
import { statusCheck, getProductsId, checkMembership } from '../../utils/utils';

import './RegistrationPage.css';

function RegistrationPage() {
    const {user, isLoading, isAuthenticated} = useAuth0();

    const location = useLocation();
    const data = location.state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let member = await checkMembership(user.email);
            let id = await getProductsId();
            let price;
            if (member === "none") {
              price = id["workshopNonMem"];
            } else {
              price = id["workshopMem"];
            }

            let response = await fetch("/routes/payment/workshop-checkout-session", {
                method: "POST",
                body: JSON.stringify({
                    id: price,
                    vid: data._id,
                    email: user.email,
                    workshopType: 'upcoming'}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await statusCheck(response);
            response = await response.json();
            window.location.href = response.url;

        } catch (error) {
            console.error("Error", error);
        }
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
                    <label className="radio-label registration-form-label" htmlFor="payment3">Pay with credit card</label>
                </div>
                <button className={"registration-form-button"} type="submit">Submit</button>
            </form>
        </div>
    </div>);
}

export default RegistrationPage;