import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import backgroundImg from '../../utils/images/events-background.png';
import { useAuth0 } from "@auth0/auth0-react";
import { statusCheck, getProductsId, checkMembership } from '../../utils/utils';

import './RegistrationPage.css';

function RegistrationPage() {
    const {user, loginWithRedirect, isAuthenticated} = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        }
    }, [isAuthenticated, user]);

    const location = useLocation();
    const data = location.state;
    let video;

    const handleSubmit = async (e) => {
        if (isAuthenticated) {
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
                        vid: video,
                        email: user.email,
                        workshopType: 'upcoming'
                    }),
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

        } else {
            loginWithRedirect();
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const makeWorkshopOptions = () => {
        const options = data.upcoming.map((option) => {
            return <option value={option._id}>{option.name}</option>
        });

        return (
            <select id="workshop" name="workshop" value={formData.workshop} onChange={handleInputChange}
                    required>
                {options}
            </select>
        )
    }

    const makePrePop = () => {
        return <div>{data.workshop.name}</div>
    }

    const [formData, setFormData] = useState({});

    if (data.workshop) {
        video = data.workshop._id;
    } else {
        video = formData.workshop;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (<div className="registration-page">
        <div className="registration-page-form">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className={"form-section"}>
                    <h3>Personal Information</h3>
                    <div className={"name-info"}>
                        <div className='left-side name-input'>
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName}
                                   onChange={handleInputChange} required/>
                        </div>
                        <div className='name-input'>
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName}
                                   onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className={"email-info"}>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email}
                               onChange={handleInputChange} required
                               readOnly={isAuthenticated && formData.email !== ''}/>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Workshop Name</h3>
                    {!data.workshop ? makeWorkshopOptions() : makePrePop()}
                </div>

                <div className="form-section">
                    <h3>Payment</h3>
                    <p>Members: $15</p>
                    <p>Non - Members: $25</p>
                </div>
                <button className={"registration-form-button"} type="submit">Pay with Stripe</button>
            </form>
        </div>
    </div>);
}

export default RegistrationPage;