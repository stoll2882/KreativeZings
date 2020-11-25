import React from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import ContactMeTitle from '../Images/ContactMeTitle.png';
import CustomOrderTitle from '../Images/CustomOrdersTitle.png';

function ContactMe() {

    function submitPressed() {

    }

    return (
        <div className="custom-text">
            <h1><img id="contact-me-title" src={ContactMeTitle} alt="Contact Me"></img></h1>
            <FormGroup id="contact-me-form">
                <h4>Please let me know if there is anything I can do to improve your experience, or if you just want to say hi!</h4>
                <br></br>
                <FormGroup>
                    <Label for="exampleName"><h4>First and Last Name</h4></Label>
                    <Input type="name" name="name" id="exampleName" placeholder="John Doe" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail"><h4>Email</h4></Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <legend><h4>Reason for Contact</h4></legend>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Specific request
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio2" />{' '}
                        Problem with my order
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio3" />{' '}
                        Just wanted to say hi :)
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio4" />{' '}
                        Other
                    </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText"><h4>Message</h4></Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <Button onClick={submitPressed}>Submit</Button>
            </FormGroup>
        </div>
    );
}

export default ContactMe;