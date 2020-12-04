import React, { useContext, useState } from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import CustomOrderTitle from '../Images/CustomOrdersTitle.png';
import ImageUploader from 'react-images-upload';
import UserContext from '../store/context';
import { Link, useHistory } from 'react-router-dom';

const CustomOrder = () => {

    const context = useContext(UserContext);

    var name;
    var email;
    var specificInstructions;
    var quantity;
    var image;

    const history = useHistory();

    function checkoutClicked() {
        history.push("/CustomOrderCheckout");
        submitted()
    }

    function onDrop(picture) {
        context.setPictures(context.pictures.concat(picture));
    }

    function submitted() {
        if (context.loggedIn == false) {
            context.setUserName(name);
        }
        context.setCustomOrderQuantity(quantity);
        var total = quantity * 6;
        context.setCustomOrderTotal(total);
        context.customOrderRequest(name, email, specificInstructions, quantity, context.pictures[0])
    }

    if (context.contactFormSubmitted == true) {
        return (
            <h1 className="welcome-div">Thank you for contacting me, {context.userName}! I will get back to you as soon as possible.</h1>
        );
    } else {
        return (
            <div>
                <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
                <FormGroup id="custom-order-form" className="custom-text">
                    <FormGroup>
                        <Label for="exampleName"><h4>First and Last Name</h4></Label>
                        <Input onChange={(e) => (name = e.target.value)} type="name" name="name" id="exampleName" placeholder="John Doe" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail"><h4>Email</h4></Label>
                        <Input onChange={(e) => (email = e.target.value)} type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText"><h4>Specific Instructions</h4></Label>
                        <Input onChange={(e) => (specificInstructions = e.target.value)} type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="quantity"><h4>Quantity</h4></Label>
                        <Input onChange={(e) => (quantity = e.target.value)} type="number" name="text" id="quantity" />
                    </FormGroup>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        singleImage={true}
                        withPreview={true}
                    />
                    {/* <FormGroup>
                        <Label for="exampleFile"><h4>Image</h4></Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        Choose an image from your own computer to upload. This will be the image on your custom sticker!
                        </FormText>
                    </FormGroup> */}
                    {/* <FormGroup check>
                        <Label check>
                        <Input type="checkbox" />{' '}
                        Check me out
                        </Label>
                    </FormGroup> */}
                    <Button  onClick={checkoutClicked}>Check Out</Button>
                </FormGroup>
            </div>
        );
    }
}

export default CustomOrder;

