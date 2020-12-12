import React, { useContext } from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import ContactMeTitle from '../Images/ContactMeTitle.png';
import UserContext from '../store/context';
import axios from 'axios';

const emailRegrex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

function ContactMe() {

    const context = useContext(UserContext);

    var fullName;
    var email;
    var reasonForContactString = "";
    var message;

    var formErrors = {
        name: "",
        email: "",
        message: "",
        overallErrorMessage: ""
    }

    function checkRadios() {
        reasonForContactString = "";
        if (document.getElementById("radio1").checked) {
            reasonForContactString = reasonForContactString + ", " + document.getElementById("radio1").value;
        } 
        if (document.getElementById("radio2").checked) {
            reasonForContactString = reasonForContactString + ", " + document.getElementById("radio2").value;
        }
        if (document.getElementById("radio3").checked) {
            reasonForContactString = reasonForContactString + ", " + document.getElementById("radio3").value;
        }
        if (document.getElementById("radio4").checked) {
            reasonForContactString = reasonForContactString + ", " + document.getElementById("radio4").value;
        }
    }

    function contactMeRequest() {
        checkRadios();
        if (reasonForContactString == "" || reasonForContactString == undefined || reasonForContactString == null) {
            reasonForContactString = "no reason";
        }
        var request = {
            name: fullName,
            email: email,
            reasonForContact: reasonForContactString,
            message: message
        }
        axios.post('http://localhost:3002/contactMe/', request).then((response) => {
            // if (response.status == 201) {
            //     if (response.status == 200) {
            //         console.log("email sent");
            //     } else {
            //         console.log("email failed to send")
            //     }
            // }
            console.log("email senttttttt");
            context.setContactFormSubmitted(true);
        }).catch((error) => {
            document.getElementById("exampleName").value = "";
            document.getElementById("exampleEmail").value = "";
            document.getElementById("exampleMessage").value = "";

            formErrors.overallErrorMessage = "CREATE ACCOUNT ERROR: " + "\n";
            console.log("email failed to send")

            var response = error.response;

            if (response.data.name != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.name + "\n";
            }
            if (response.data.email != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.email + "\n";
            }
            if (response.data.message != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.message + "\n";
            }

            document.getElementById("overall-error-message").innerHTML = formErrors.overallErrorMessage;
            console.log("email failed to send from backend...");
        });
    }

    function submit() {
        // if (context.loggedIn == false) {
        //     context.setUserName(name);
        // }
        // context.setContactFormSubmitted(true);
        // context.contactMeRequest(name, email, reasonForContactString, message);
        contactMeRequest();
    }

    function handleChange(e) {
        e.preventDefault();
        document.getElementById("overall-error-message").innerHTML = "";

        const { name, value } = e.target;
        let formErrorList = formErrors;

        switch(name) {
            case "name":
                formErrorList.name = value.length < 3 ? 
                "minimum 3 characters required": ""
                document.getElementById("name-error").innerHTML = formErrors.name;
                fullName = value;
                break;
            case "message":
                formErrorList.message = value.length < 3 ? 
                "minimum 3 characters required": ""
                document.getElementById("message-error").innerHTML = formErrors.message;
                message = value;
                break;
            case "email":                
                formErrorList.email = emailRegrex.test(value) && value.length > 0 ? 
                "": "invalid email address"
                document.getElementById("email-error").innerHTML = formErrors.email;
                email = value;
                break;
        }
    }

    if (context.contactFormSubmitted == true) {
        return (
            <h1 className="welcome-div">Thank you for contacting me, {context.userName}! I will get back to you as soon as possible.</h1>
        );
    } else {
        return (
            <div className="custom-text">
                <h1><img id="contact-me-title" src={ContactMeTitle} alt="Contact Me"></img></h1>
                <FormGroup id="contact-me-form">
                    <h4>Please let me know if there is anything I can do to improve your experience, or if you just want to say hi!</h4>
                    <br></br>
                    <FormGroup>
                        <Label for="exampleName"><h4>First and Last Name</h4></Label>
                        <Input onChange={handleChange} type="name" name="name" id="exampleName" placeholder="John Doe" />
                        <span id="name-error" style={{color: "red"}}>{formErrors.name}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail"><h4>Email Reply Should be Sent to</h4></Label>
                        <Input onChange={handleChange} type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
                        <span id="email-error" style={{color: "red"}}>{formErrors.email}</span>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend><h4>Reason for Contact</h4></legend>
                        <FormGroup check>
                        <Label check>
                            <Input onChange={checkRadios} type="radio" id="radio1" value="Specific Request"/>{' '}
                            {/* <Input onChange={((e) => change(e.target.value, "Specific request"))} type="radio" id="radio1" value="Specific Request"/>{' '} */}
                            Specific request
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={checkRadios} type="radio" id="radio2" value="Problem with my Order"/>{' '}
                            {/* <Input onChange={(e) => change(e.target.value, "Problem with my order")} type="radio" id="radio2" value="Problem with my Order"/>{' '} */}
                            Problem with my order
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={checkRadios} type="radio" id="radio3" value="Just wanted to say hi :)"/>{' '}
                            {/* <Input onChange={(e) => change(e.target.value, "Just wanted to say hi :)")} type="radio" id="radio3" value="Just wanted to say hi :)"/>{' '} */}
                            Just wanted to say hi :)
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input onChange={checkRadios} type="radio" id="radio4" value="other"/>{' '}
                            Other
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText"><h4>Message</h4></Label>
                        <Input onChange={handleChange} type="textarea" name="message" id="exampleMessage" />
                        <span id="message-error" style={{color: "red"}}>{formErrors.message}</span>
                    </FormGroup>
                    <Button onClick={submit}>Submit</Button>
                    <span id="overall-error-message" style={{color: "red"}}>{formErrors.overallErrorMessage}</span>
                </FormGroup>
            </div>
        );
    }
}

export default ContactMe;