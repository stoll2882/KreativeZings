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
import CheckOutForm from "../Components/CheckoutForm";

// user can simulate checkout process! 

function ShoppingCart () {
    const context = useContext(UserContext);

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
    }
    
    return (
        <div className="custom-text" id="checkout-div">
            <h1><img id="prices-title" src={CheckoutTitle} alt="Prices"></img></h1>

            <Table striped bordered hover variant="none" id="prices-table">
                <thead>
                    <tr style={{fontSize: "larger"}}>
                        <th>Number of Items</th>
                        <th>Total Price</th>
                    </tr>
                    <tr style={{fontSize: "larger"}}>
                        <td>
                            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                                {
                                    context.cart.map( (item) => {
                                        return (
                                            <li>{item.name} - {item.quantity}</li>
                                        )
                                    })
                                }
                            </ul>
                        </td>
                        <td>${context.cartTotal}.00</td>
                    </tr>
                </thead>
            </Table>
            <CheckOutForm order={{ orderTpe: "catalog", cart: context.cart, total: context.cartTotal }}/>
            
            {/* <Form id="checkout-form">
                <h4>Enter Information Below:</h4>
                <br></br>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleFirstName"><h4>First Name</h4></Label>
                            <Input type="name" name="name" id="exampleFirstName" placeholder="John" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleLastName"><h4>Last Name</h4></Label>
                            <Input type="name" name="name" id="exampleLastName" placeholder="Doe" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup md={12}>
                            <Label for="exampleAddress"><h4>Shipping Address</h4></Label>
                            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main Ave" />
                        </FormGroup>  
                    </Col>     
                </Row>
                <Row>
                    <Col>
                        <FormGroup md={12}>
                            <Label for="exampleAddressL2"><h4>Address 2</h4></Label>
                            <Input type="text" name="address" id="exampleAddressL2" placeholder="Apartment, Floor, etc." />
                        </FormGroup>  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup md={6}>
                            <Label for="exampleCity"><h4>City</h4></Label>
                            <Input type="text" name="address" id="exampleCity" />
                        </FormGroup>  
                    </Col>
                    <Col>
                        <FormGroup md={4}>
                            <Label for="exampleState"><h4>State</h4></Label>
                            <Input type="text" name="address" id="exampleState" />
                        </FormGroup>  
                    </Col>  
                    <Col>
                        <FormGroup md={2}>
                            <Label for="exampleZip"><h4>Zip Code</h4></Label>
                            <Input type="text" name="address" id="exampleZip" />
                        </FormGroup>  
                    </Col>       
                </Row>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <FormGroup md={12} id="credit-cart-field">
                            <Label for="exampleCity" id="credit-card-field-label"><h4>Credit Card Number</h4></Label>
                            <CreditCardInput />
                        </FormGroup>  
                    </Col>   
                </Row>
                <Button onClick={submitClicked}>Submit Order</Button>
            </Form> */}
        </div>
    );
}

export default ShoppingCart;