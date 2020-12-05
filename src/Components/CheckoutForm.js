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

// user can simulate checkout process! 

function CheckoutForm (props) {
    const context = useContext(UserContext);

    var firstName;
    var lastName;
    var email;
    var shippingAddress;
    var address2;
    var city;
    var state;
    var zip;
    var creditCardNumber;
    var expiration;
    var cardCvc;

    function submitClicked() {
        var pageDiv = document.getElementById("checkout-div")
        var form = document.getElementById("checkout-form")
        form.classList.add("hide");

        let confirmationDiv = document.createElement("div");
        let confirmationInfo = document.createElement("h2");
        let newString = "Your order has been submitted. Thank you for your puchase!"
        confirmationInfo.innerHTML = newString;
        confirmationDiv.appendChild(confirmationInfo);
        pageDiv.appendChild(confirmationDiv);

        var fullName = firstName + " " + lastName;
        var fullAddress = shippingAddress + ", " + address2 + ", " + city + " " + state + ", " + zip;
        var fullCreditCardInfo = {
            number: creditCardNumber,
            expiry: expiration,
            cvc: cardCvc
        }

        var order = props.order;

        context.checkOutOrderSubmit(fullName, email, fullAddress, fullCreditCardInfo, order);
    }
    
    return (
        <Form id="checkout-form">
            <h4>Enter Information Below:</h4>
            <br></br>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleFirstName"><h4>First Name</h4></Label>
                        <Input onChange={(e) => (firstName = e.target.value)} type="name" name="name" id="exampleFirstName" placeholder="John" autoComplete="off" />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleLastName"><h4>Last Name</h4></Label>
                        <Input onChange={(e) => (lastName = e.target.value)} type="name" name="name" id="exampleLastName" placeholder="Doe" autoComplete="off"/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleAddress"><h4>Email</h4></Label>
                        <Input onChange={(e) => (email = e.target.value)} type="text" name="email" id="exampleEmail" placeholder="name@example.com" autoComplete="off" />
                    </FormGroup>  
                </Col>     
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleAddress"><h4>Shipping Address</h4></Label>
                        <Input onChange={(e) => (shippingAddress = e.target.value)} type="text" name="address" id="exampleAddress" placeholder="1234 Main Ave" autoComplete="off" />
                    </FormGroup>  
                </Col>     
            </Row>
            <Row>
                <Col>
                    <FormGroup md={12}>
                        <Label for="exampleAddressL2"><h4>Address 2</h4></Label>
                        <Input onChange={(e) => (address2 = e.target.value)} type="text" name="address" id="exampleAddressL2" placeholder="Apartment, Floor, etc." autoComplete="off" />
                    </FormGroup>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup md={6}>
                        <Label for="exampleCity"><h4>City</h4></Label>
                        <Input onChange={(e) => (city = e.target.value)} type="text" name="address" id="exampleCity" autoComplete="off" />
                    </FormGroup>  
                </Col>
                <Col>
                    <FormGroup md={4}>
                        <Label for="exampleState"><h4>State</h4></Label>
                        <Input onChange={(e) => (state = e.target.value)} type="text" name="address" id="exampleState" autoComplete="off" />
                    </FormGroup>  
                </Col>  
                <Col>
                    <FormGroup md={2}>
                        <Label for="exampleZip"><h4>Zip Code</h4></Label>
                        <Input onChange={(e) => (zip = e.target.value)} type="text" name="address" id="exampleZip" autoComplete="off" />
                    </FormGroup>  
                </Col>       
            </Row>
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <FormGroup md={12} id="credit-cart-field">
                        <Label for="exampleCity" id="credit-card-field-label"><h4>Credit Card Number</h4></Label>
                        <CreditCardInput autoComplete="off" 
                              cardNumberInputProps={{ onChange: (e) => creditCardNumber = e.target.value }}
                              cardExpiryInputProps={{ onChange: (e) => expiration = e.target.value }}
                              cardCVCInputProps={{ onChange: (e) => cardCvc = e.target.value }}
                              fieldClassName="input"
                        />
                    </FormGroup>  
                </Col>   
            </Row>
            <Button onClick={submitClicked}>Submit Order</Button>
        </Form>
    );
}

export default CheckoutForm;