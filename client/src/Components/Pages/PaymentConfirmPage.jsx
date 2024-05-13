import React from "react";
import { Link } from "react-router-dom";

export const PaymentConfirmPage = () => {
    return (
        <div style={{padding: '100px', margin: 'auto'}} className={"payment-confirmation"}>
            <h1>Your payment is successful!</h1>
            <p>
                Navigate back to membership page
                <Link to="/Membership"> here</Link>
            </p>
        </div>
    );
};
