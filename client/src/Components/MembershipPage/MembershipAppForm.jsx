import React, { useEffect } from 'react';
import './MembershipPage.css';
import { statusCheck, getProductsId } from '../../utils/utils';
import { useAuth0 } from "@auth0/auth0-react";
import './MembershipAppForm.css';

let studentId;
let profId;

let productsId = await getProductsId();
studentId = productsId['student_id'];
profId = productsId['prof_id'];

function MembershipAppForm() {
    const {user, isLoading, isAuthenticated} = useAuth0();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const createPaymentSession = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch("/routes/payment/create-checkout-session", {
                method: "POST",
                body: JSON.stringify({
                    id: document.querySelector('input[type="radio"]:checked').value,
                    type: document.querySelector('input[type="radio"]:checked').id,
                    email: user.email}),
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
    }

    return (
        <div className={"membership-form"}>
            <h1>Membership sign up</h1>
            <form>
                <div className={"form-section"}>
                    <h2>Personal Information</h2>
                    <div className={"name-info"}>
                        <div className='left-side name-input'>
                            <label for="fname">First Name</label>
                            <input type="text" name="fname" id="fname"/>
                        </div>
                        <div className='name-input'>
                            <label for="lname">Last Name</label>
                            <input type="text" name="lname" id="lname"/>
                        </div>
                    </div>
                    <div className={"email-info"}>
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email"/>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Membership Registration</h2>
                    <p>Select a membership registration type:</p>
                    <div className="membership-type-holder">
                        <div className="options-questions">
                            <label for="student">
                                <p><strong>Student</strong></p>
                                <p className='price'>$10.00</p>
                            </label>
                            <input type="radio" id="student" name="student" value={studentId}/>
                        </div>

                        <div className="options-questions">
                            <label for="professional">
                                <p><strong>Professional</strong></p>
                                <p className='price'>$25.00</p>
                            </label>
                            <input type="radio" id="professional" name="professional" value={profId}/>
                        </div>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Employment Status</h2>
                    <div className={"job-info"}>
                        <div className='left-side name-input'>
                            <label for="job">Current job title</label>
                            <input type="text" name="job" id="job" />
                        </div>
                        <div className='name-input'>
                            <label for="employer">Employer name</label>
                            <input type="text" name="employer" id="employer" />
                        </div>
                    </div>
                </div>

                <div className='form-section'>
                    <h2>Current professional credentials (select all that apply):</h2>
                    <div className='prof-credentials'>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="rhit" name="rhit" value="RHIT"/>
                            <label for="rhit">RHIT</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="rhia" name="rhia" value="RHIA"/>
                            <label for="rhia">RHIA</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="ccs" name="rhit" value="CCS"/>
                            <label for="ccs">CCS</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="other" name="other" value="Other"/>
                            <label for="other">CHPS</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="cpc" name="cpc" value="CPC"/>
                            <label for="cpc">CPC</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="rhit" name="rhit" value="RHIT"/>
                            <label for="rhit">RHIT</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="cic" name="cic" value="CIC"/>
                            <label for="cic">CIC</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="coc" name="coc" value="COC"/>
                            <label for="coc">COC</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="chps" name="chps" value="CHPS"/>
                            <label for="chps">Student</label>
                        </div>
                        <div className={"credentials-question"}>
                            <input type="checkbox" id="student" name="student" value="Student"/>
                            <label for="student">Other</label>
                        </div>
                    </div>
                </div>

                <div className='student-section form-section'>
                    <h2>Students</h2>
                    <div>
                        <label for="college">For student memberships, indicate where you are currently enrolled:</label>
                        <input type="text" name="college" id="college"/>
                    </div>
                    <div>
                        <label for="college">For student memberships, indicate your current program of study:</label>
                        <input type="text" name="college" id="college"/>
                    </div>
                </div>

                <h2> I would like to participate in SHIMA (select all that apply):</h2>
                <div className='parti-options'>
                    <div className='options-section'>
                        <div className={"options-questions"}>
                            <input type="checkbox" id="board" name="board" value="board"/>
                            <label for="board">Board Member (run for an elected position)</label>
                        </div>
                        <div className={"options-questions"}>
                            <input type="checkbox" id="speaker" name="speaker" value="speaker"/>
                            <label for="speaker">Speaker at a future workshop</label>
                        </div>
                    </div>
                    <div className='options-section'>
                        <div className={"options-questions"}>
                            <input type="checkbox" id="committee" name="committee" value="committee"/>
                            <label for="committee">Committee Member (involved in a specific area of SHIMA)</label>
                        </div>
                        <div className={"options-questions"}>
                            <input type="checkbox" id="no" name="no" value="no"/>
                            <label for="no">Not interested</label>
                        </div>
                    </div>
                </div>

                <div className='btn-wrapper'>
                    <button onClick={createPaymentSession}>Continue to payment</button>
                </div>
            </form>
        </div>
    )
}

export default MembershipAppForm;