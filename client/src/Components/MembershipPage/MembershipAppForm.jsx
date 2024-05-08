import React from 'react';
import './MembershipPage.css';

let studentId;
let profId;

const statusCheck = async (res) => {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

const membershipId = async () => {
    try {
        let res = await fetch("routes/payment/get-product-id");
        await statusCheck(res);
        let info = await res.json();
        studentId = info['student_id'];
        profId = info['prof_id'];
    } catch (err) {
        console.log(err);
    }
}

await membershipId();

console.log(`student: ${studentId}`);

function MembershipAppForm() {
    return (
        <div className={"membership-form"}>
            <h1>Membership sign up</h1>
            <form>
                <label for="fname">First Name</label>
                <input type="text" name="fname" id="fname" required/>

                <label for="lname">Last Name</label>
                <input type="text" name="lname" id="lname" required/>

                <label for="email">Email</label>
                <input type="text" name="email" id="email" required/>

                <p>Select a membership registration type:</p>
                <div className={"options-questions"}>
                    <input type="radio" id="professional" name="professional" value={profId}/>
                    <label for="professional">Professional ($25.00)</label>
                </div>

                <div className={"options-questions"}>
                    <input type="radio" id="student" name="student" value={studentId}/>
                    <label for="student">Student ($10.00)</label>
                </div>

                <label for="job">Current job title</label>
                <input type="text" name="job" id="job" required/>

                <label for="employer">Employer name</label>
                <input type="text" name="employer" id="employer" required/>

                <p>Current professional credentials (select all that apply):</p>
                <div className={"options-questions"}>
                    <input type="checkbox" id="rhit" name="rhit" value="RHIT"/>
                    <label for="rhit">RHIT</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="rhia" name="rhia" value="RHIA"/>
                    <label for="rhia">RHIA</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="ccs" name="rhit" value="CCS"/>
                    <label for="ccs">CCS</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="cpc" name="cpc" value="CPC"/>
                    <label for="cpc">CPC</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="rhit" name="rhit" value="RHIT"/>
                    <label for="rhit">RHIT</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="cic" name="cic" value="CIC"/>
                    <label for="cic">CIC</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="coc" name="coc" value="COC"/>
                    <label for="coc">COC</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="chps" name="chps" value="CHPS"/>
                    <label for="chps">CHPS</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="student" name="student" value="Student"/>
                    <label for="student">Student</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="other" name="other" value="Other"/>
                    <label for="other">Other</label>
                </div>

                <label for="college">For student memberships, indicate where you are currently enrolled:</label>
                <input type="text" name="college" id="college"/>

                <label for="college">For student memberships, indicate your current program of study:</label>
                <input type="text" name="college" id="college"/>

                <p> I would like to participate in SHIMA (select all that apply):</p>
                <div className={"options-questions"}>
                    <input type="checkbox" id="board" name="board" value="board"/>
                    <label for="board">Board Member (run for an elected position)</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="committee" name="committee" value="committee"/>
                    <label for="committee">Committee Member (involved in a specific area of SHIMA)</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="speaker" name="speaker" value="speaker"/>
                    <label for="speaker">Speaker at a future workshop</label>
                </div>

                <div className={"options-questions"}>
                    <input type="checkbox" id="no" name="no" value="no"/>
                    <label for="no">Not interested</label>
                </div>

                <button onClick={createPaymentSession}>Continue to payment</button>
            </form>
        </div>
    )
}

async function createPaymentSession(event) {
    event.preventDefault();
    try {
        let response = await fetch("/routes/payment/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({id: document.querySelector('input[type="radio"]:checked').value}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        window.location.href = response.url;
    } catch (error) {
        console.error("Error", error);
    }
}

export default MembershipAppForm;