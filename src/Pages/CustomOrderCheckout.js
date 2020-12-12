import React, {useContext} from 'react';
import Context from '../store/context';
import Table from 'react-bootstrap/Table';
import CheckoutTitle from '../Images/CheckoutTitle.png';
import { Button, FormGroup, Label, Input, Row, Col, Form } from 'reactstrap';
import CreditCardInput from 'react-credit-card-input';
import CheckoutForm from "../Components/CheckoutForm";

import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';

// user can simulate checkout process! 

function CustomOrderCheckout () {
    const context = useContext(UserContext);

    function submitClicked() {
        var pageDiv = document.getElementById("checkout-div")
        var form = document.getElementById("checkout-form")
        form.classList.add("hide");

        let confirmationDiv = document.createElement("div");
        let confirmationInfo = document.createElement("h2");
        let newString = "Your order has been submitted. Thank you for your custom order!"
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
                                <li>Custom Order, Quantity: {context.customOrderQuantity}</li>
                            </ul>
                        </td>
                        <td>${context.customOrderTotal}.00</td>
                    </tr>
                </thead>
            </Table>

            <CheckoutForm order={{ orderType: "custom", total: context.customOrderTotal, quantity: context.customOrderQuantity }}/>
        </div>
    );
}

export default CustomOrderCheckout;