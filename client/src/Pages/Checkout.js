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
        </div>
    );
}

export default ShoppingCart;