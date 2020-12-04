import React, { useContext } from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import ContactMeTitle from '../Images/ContactMeTitle.png';
import UserContext from '../store/context';

function ContactMe() {

    const context = useContext(UserContext);

    var name;
    var email;
    var reasonForContact = [""];
    var reasonForContactString = "";
    var message;

    function change(value, reason) {
        if (value == "on") {
            if (reasonForContact != "" && (reasonForContact.indexOf(reason) > -1)) {
                reasonForContact.push(reason);
            } else {
                reasonForContact = reason;
            }
        } else {
            if (reasonForContact.indexOf(reason) > -1) {
                delete reasonForContact[reasonForContact.indexOf(reason)];
            }
        } 
    }

    function submit() {
        if (reasonForContact.length > 0) {
            reasonForContactString = reasonForContact[0];
            if (reasonForContact.length > 1) {
                for (var i = 1; i < reasonForContact.length; i++) {
                    reasonForContactString = reasonForContactString + ", " + reasonForContact[i];
                }
            }

        }
        if (context.loggedIn == false) {
            context.setUserName(name);
        }
        context.setContactFormSubmitted(true);
        context.contactMeRequest(name, email, reasonForContactString, message);
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
                        <Input onChange={(e) => (name = e.target.value)} type="name" name="name" id="exampleName" placeholder="John Doe" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail"><h4>Email Reply Should be Sent to</h4></Label>
                        <Input onChange={(e) => (email = e.target.value)} type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend><h4>Reason for Contact</h4></legend>
                        <FormGroup check>
                        <Label check>
                            <Input onChange={((e) => change(e.target.value, "Specific request"))} type="radio" name="radio1" />{' '}
                            Specific request
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input onChange={(e) => change(e.target.value, "Problem with my order")} type="radio" name="radio2" />{' '}
                            Problem with my order
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input onChange={(e) => change(e.target.value, "Just wanted to say hi :)")} type="radio" name="radio3" />{' '}
                            Just wanted to say hi :)
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input onChange={(e) => change(e.target.value), "Other"} type="radio" name="radio4" />{' '}
                            Other
                        </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText"><h4>Message</h4></Label>
                        <Input onChange={(e) => (message = e.target.value)} type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button onClick={submit}>Submit</Button>
                </FormGroup>
            </div>
        );
    }
}

export default ContactMe;