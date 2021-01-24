import React, { useContext, useState } from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import CustomOrderTitle from '../Images/CustomOrdersTitle.png';
import ImageUploader from 'react-images-upload';
import UserContext from '../store/context';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

const CustomOrder = () => {

    const context = useContext(UserContext);

    let name = context.name;
    let email = context.email;
    var specificInstructions = "";
    var quantity;
    var formErrors = {
        quantity: "",
        image: "",
        specificInstructions: "",
        overallErrorMessage: ""
    }

    const history = useHistory();

    function checkoutClicked() {
        // document.getElementById("exampleImage").value = undefined;
        document.getElementById("exampleSI").value = "";
        document.getElementById("quantity").value = undefined;

        if (context.pictures.length != 0) {
            customOrderRequest();
        } else {
            formErrors.overallErrorMessage = formErrors.overallErrorMessage + "custom image is required";
            document.getElementById("overall-error-message").innerHTML = formErrors.overallErrorMessage;
        }
        // if (formValid(formErrors)) {
        //     history.push("/CustomOrderCheckout");
        //     submitted();
        // }
    }

    function onDrop(picture) {
        context.setPictures(context.pictures.concat(picture));
        // formErrors.imageUpload = "";
    }

    function customOrderRequest() {
        var data = new FormData();
        data.append("image", context.pictures[0]);
        let url = 'http://localhost:3002/customOrderRequest/' + name + "/" + email + "/" + specificInstructions + "/" + quantity;
        console.log('making request to...' + url);
        formErrors.overallErrorMessage = "";
        axios.post(url, data).then((response) => {
            console.log("email sent");
            if(name != undefined && name != "" && email != undefined && email != "" && quantity != undefined && quantity != 0 && context.pictures[0] != undefined) {
                if (context.loggedIn == false) {
                    context.setUserName(name);
                }
                context.setCustomOrderQuantity(quantity);
                var total = quantity * 6;
                context.setCustomOrderTotal(total);
            }
            console.log(JSON.stringify(formErrors));
            if (formValid(formErrors)) {
                history.push("/CustomOrderCheckout");
            }
        }).catch((error) => {
                formErrors.overallErrorMessage = "CREATE ACCOUNT ERROR: " + "\n";
                console.log("email failed to send")

                var response = error.response;

                if (response.data.name != null) {
                    formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.name + "\n";
                }
                if (response.data.email != null) {
                    formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.email + "\n";
                }
                if (response.data.quantity != null) {
                    formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.quantity + "\n";
                }
                if (response.data.specificInstructions != null) {
                    formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.specificInstructions + "\n";
                }
                if (response.data.image != null) {
                    formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.image + "\n";
                }

                document.getElementById("overall-error-message").innerHTML = formErrors.overallErrorMessage;
        });
    }

    function handleChange(e) {
        e.preventDefault();
        document.getElementById("overall-error-message").innerHTML = "";

        const { name, value } = e.target;

        if (name == "quantity") {
            quantity = value;
            if (value < 1) {
                formErrors.quantity = "Minimum quantity for a custom order is 1";
            } else {
                formErrors.quantity = "";
            }
            document.getElementById("quantity-error").innerHTML = formErrors.quantity;
        } else if (name == "specificInstructions") {
            specificInstructions = value;
            if (value.length < 2) {
                formErrors.specificInstructions = "Specific Instructions required: enter n/a for no special requests "
            } else {
                formErrors.specificInstructions = "";
            }
            document.getElementById("specific-instructions-error").innerHTML = formErrors.specificInstructions;
        }
    }

    return (
        <div>
            <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
            <FormGroup id="custom-order-form" className="custom-text">
                <Label for="exampleImage"><h4>Upload 1 custom image here</h4></Label>
                <ImageUploader
                    name="image"
                    id = "exampleImage"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                    withPreview={true}
                />
                <FormGroup>
                    <Label for="exampleName"><h4>First and Last Name:<br></br> {name}</h4></Label>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail"><h4>Email:<br></br> {email}</h4></Label>
                    <span id="first-name-error" style={{color: "red"}}>{formErrors.firstName}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText"><h4>Specific Instructions</h4></Label>
                    <Input onChange={handleChange} type="textarea" name="specificInstructions" id="exampleSI" autoComplete="off" />
                    <span id="specific-instructions-error" style={{color: "red"}}>{formErrors.specificInstructions}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="quantity"><h4>Quantity</h4></Label>
                    <Input onChange={handleChange} type="number" name="quantity" id="quantity" autoComplete="off" />
                    <span id="quantity-error" style={{color: "red"}}>{formErrors.quantity}</span>
                </FormGroup>
                <Button onClick={checkoutClicked}>Check Out</Button>
                <span id="overall-error-message" style={{color: "red"}}> {formErrors.overallErrorMessage}</span>
            </FormGroup>
        </div>
    );
}

export default CustomOrder;
