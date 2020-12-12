import React, {useContext} from 'react';
import Context from '../store/context';
import Table from 'react-bootstrap/Table';
import CheckoutTitle from '../Images/CheckoutTitle.png';
import { Button, FormGroup, Label, Input, Row, Col, Form } from 'reactstrap';
import CreditCardInput from 'react-credit-card-input';

import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';
import LinkContainer from 'react-router-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Checkout from '../Pages/Checkout';
import axios from "axios";

// user can simulate checkout process! 

function CheckoutForm (props) {
    const context = useContext(UserContext);

    var name = context.name;
    var email = context.email;
    var shippingAddress;
    var address2;
    var city;
    var state;
    var zip;
    var creditCardNumber;
    var expiration;
    var cardCvc;

    var formErrors = {
        addressMain: "",
        addressCity: "",
        addressState: "",
        addressZip: "",
        overallErrorMessage: ""
    }

    function submitClicked() {
        document.getElementById("exampleAddress").innerHTML = "";
        document.getElementById("exampleCity").innerHTML = "";
        document.getElementById("exampleState").innerHTML = "";
        document.getElementById("exampleZip").innerHTML = "";

        checkOutOrderSubmit();
    }

    function checkOutOrderSubmit() {
        context.updateCart(context.userName, []);
        if (address2 == undefined) {
            address2 = "";
        }
        if (shippingAddress == undefined) {
            shippingAddress = "";
        }
        if (city == undefined) {
            city = "";
        }
        if (state == undefined) {
            state = "";
        }
        if (zip == undefined) {
            zip = "";
        }
        var fullAddress = shippingAddress + ", " + address2 + ", " + city + " " + state + ", " + zip;
        var fullCreditCardInfo = {
            number: creditCardNumber,
            expiry: expiration,
            cvc: cardCvc
        }
        var order = props.order;
        var checkoutInformation = {
            userName: context.userName,
            name: name,
            email: email,
            address: fullAddress,
            creditCardInfo: fullCreditCardInfo,
            orderInfo: order
        }
        axios.post('http://localhost:3002/orderPayment/', checkoutInformation).then((response) => {
            context.getUserOrders(context.userName);
            console.log("information written to back end");
            var pageDiv = document.getElementById("checkout-div")
            var form = document.getElementById("checkout-form")
            form.classList.add("hide");
    
            let confirmationDiv = document.createElement("div");
            let confirmationInfo = document.createElement("h2");
            let newString = "Your order has been submitted. Thank you for your puchase!"
            confirmationInfo.innerHTML = newString;
            confirmationDiv.appendChild(confirmationInfo);
            pageDiv.appendChild(confirmationDiv);
            context.setCart([]);
            context.setCartTotal(0);
            context.updateCart(context.userName, []);
        }).catch((error) => {
            document.getElementById("infoTitle").innerHTML = "ERRORRRRR";
            formErrors.overallErrorMessage = "CUSTOM ORDER ERROR: " + "\n";

            var response = error.response;

            if (response.data.name != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.name + "\n";
            }
            if (response.data.email != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.email + "\n";
            }
            if (response.data.userName != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.userName + "\n";
            }
            if (response.data.address != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data.address + "\n";
            }
            if (response.data["creditCardInfo.number"] != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data["creditCardInfo.number"] + "\n";
            }
            if (response.data["creditCardInfo.expiry"] != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data["creditCardInfo.expiry"] + "\n";
            }
            if (response.data["creditCardInfo.cvc"] != null) {
                formErrors.overallErrorMessage = formErrors.overallErrorMessage + response.data["creditCardInfo.cvc"] + "\n";
            }
            document.getElementById("overall-error-message").innerHTML = formErrors.overallErrorMessage;
            console.log("information failed to write to back end")
        });
    }

    function handleChange(e) {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrorList = formErrors;

        switch(name) {
            case "addressMain":
                formErrorList.addressMain = value.length < 5 ? 
                "minimum 5 characters required": ""
                document.getElementById("address-main-error").innerHTML = formErrorList.addressMain;
                shippingAddress = value;
                break;
            case "addressCity":
                formErrorList.addressCity = value.length < 3 ? 
                "minimum 3 characters required": ""
                document.getElementById("address-city-error").innerHTML = formErrorList.addressCity;
                city = value;
                break;
            case "addressState":
                formErrorList.addressState = value.length != 2 ? 
                "2 characters required": ""
                document.getElementById("address-state-error").innerHTML = formErrorList.addressState;
                state = value;
                break;
            case "addressZip":
                formErrorList.addressZip = value.length < 3 || value.length > 5 ? 
                "between 3 and 5 characters required": ""
                document.getElementById("address-zip-error").innerHTML = formErrorList.addressZip;
                zip = value;
                break;
            case "addressSecond":
                address2 = value;
                break;
        }
    }
    
    return (
        <Form id="checkout-form">
            <h4 id="infoTitle">Enter Information Below:</h4>
            <br></br>
            <Row form>
                <Col md={12}>
                    <FormGroup>
                        <Label for="exampleName"><h4>Name:<br></br> {name}</h4></Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleEmail"><h4>Email:<br></br> {email}</h4></Label>
                    </FormGroup>  
                </Col>     
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleAddress"><h4>Shipping Address</h4></Label>
                        <Input onChange={handleChange} type="text" name="addressMain" id="exampleAddress" placeholder="1234 Main Ave" autoComplete="off" />
                        <span id="address-main-error" style={{color: "red"}}>{formErrors.addressState}</span>
                    </FormGroup>  
                </Col>     
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleAddressL2"><h4>Address 2</h4></Label>
                        <Input onChange={handleChange} type="text" name="addressSecond" id="exampleAddressL2" placeholder="Apartment, Floor, etc." autoComplete="off" />
                    </FormGroup>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup md={6}>
                        <Label for="exampleCity"><h4>City</h4></Label>
                        <Input onChange={handleChange} type="text" name="addressCity" id="exampleCity" autoComplete="off" />
                        <span id="address-city-error" style={{color: "red"}}>{formErrors.addressCity}</span>
                    </FormGroup>  
                </Col>
                <Col>
                    <FormGroup md={4}>
                        <Label for="exampleState"><h4>State</h4></Label>
                        <Input onChange={handleChange} type="text" name="addressState" id="exampleState" autoComplete="off" />
                        <span id="address-state-error" style={{color: "red"}}>{formErrors.addressState}</span>
                    </FormGroup>  
                </Col>  
                <Col>
                    <FormGroup md={2}>
                        <Label for="exampleZip"><h4>Zip Code</h4></Label>
                        <Input onChange={handleChange} type="text" name="addressZip" id="exampleZip" autoComplete="off" />
                        <span id="address-zip-error" style={{color: "red"}}>{formErrors.addressZip}</span>
                    </FormGroup>  
                </Col>       
            </Row>
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <FormGroup md={12} id="credit-cart-field">
                        <Label for="exampleCity" id="credit-card-field-label"><h4>Credit Card Information<br></br></h4></Label>
                        <CreditCardInput autoComplete="off" id="creditInput"
                              cardNumberInputProps={{ onChange: (e) => creditCardNumber = e.target.value }}
                              cardExpiryInputProps={{ onChange: (e) => expiration = e.target.value }}
                              cardCVCInputProps={{ onChange: (e) => cardCvc = e.target.value }}
                              fieldClassName="input"
                        />
                    </FormGroup>  
                </Col>   
            </Row>
            <Row>
                <Col>
                    <span id="overall-error-message" style={{color: "red"}}>{formErrors.overallErrorMessage}</span>
                </Col>
            </Row>
            <Button onClick={submitClicked}>Submit Order</Button>
        </Form>
    );
}

export default CheckoutForm;