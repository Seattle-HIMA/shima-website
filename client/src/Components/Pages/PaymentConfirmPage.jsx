import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const PaymentConfirmPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{padding: '100px', margin: 'auto'}} className={"payment-confirmation"}>
            <h1>Your payment is successful!</h1>
            <p>
                Navigate back to the website
                <Link to={'..'} onClick={(e) => {
                    e.preventDefault();
                    navigate(-2);
                    }}> here
                </Link>
            </p>
        </div>
    );
};
