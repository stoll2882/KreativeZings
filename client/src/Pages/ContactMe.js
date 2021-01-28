import React, { useContext, useState } from 'react'
import ContactMeTitle from '../Images/ContactMeTitle.png';
import { useForm } from 'react-hook-form';
import UtilityService from '../services/UtilityService';
import UserContext from '../store/context';

export default function ContactMe() {

    const { register, errors, handleSubmit, formState, reset } = useForm();
    const context = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");

    async function onSubmit(data) {
        document.getElementById("submit-button").disabled = true;
        try {
            var result = await UtilityService.contactMeRequest(data.contactName, data.contactEmail, data.contactReason, data.contactMessage);
            setErrorMessage("");
        } catch(error) {
            var newErrorMessage = "ERRORS: "
            for(var x = 0; x < error.response.data.message.length; x++) {
                newErrorMessage = newErrorMessage + "Error["+x+"]: "+error.response.data.message[x];
            }
            setErrorMessage(newErrorMessage);
        }
        document.getElementById("submit-button").disabled = false;
        context.setContactFormSubmitted(true);
    }

    function handleClearForm(e) {
        e.preventDefault();
        context.setContactFormSubmitted(false);
        reset();
    }

    const reasons = [ "Specific Request", "Problem with my Order", "Just wanted to say hi :)", "other"];

    React.useEffect(() => {},[formState]);    

    if (context.contactFormSubmitted) {
        return (
            <div>
                <h1>Thank you!</h1>  
                <p>{errorMessage}</p>
                <button onClick={handleClearForm}>Send More Feedback</button>
            </div>
        );
    } else {
        return (
            <div className="custom-text">
                <h1><img id="contact-me-title" src={ContactMeTitle} alt="Contact Me"></img></h1>
                <form className="form" onSubmit={handleSubmit(onSubmit)} id="contact-me-form">
                    <label><h4>Full Name</h4></label>
                    <input className="form-input" name="contactName" placeholder="John Doe" ref={register({required: true, minLength: 2})} />
                    <span className="form-error-label">{errors.contactName && "Need to specific a name to contact over 5 characters"}</span>
                    <label><h4>Your E-mail</h4></label>
                    <input className="form-input" name="contactEmail" placeholder="na@example.com" ref={register({required: true, minLength: 5, pattern: UtilityService.EMAIL_REGEX_PATTERN  })} />
                    <span className="form-error-label">{errors.contactEmail && "Need a valid e-mail address"}</span>
                    <label><h4>Reason for contact</h4></label>
                    <select className="form-input" name="contactReason" ref={register}>
                        { reasons.map((reason) => (<option id="id-{reason}" value={reason}>{reason}</option>))}
                    </select>
                    <label><h4>Additional Information</h4></label>
                    <textarea className="form-input" name="contactMessage" placeholder="Any additional information" ref={register}/>
                    <input id="submit-button" type="submit"/>
                </form>
            </div>
        );
    }
}


