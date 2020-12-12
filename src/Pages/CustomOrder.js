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
                // context.customOrderRequest(name, email, specificInstructions, quantity, context.pictures[0]);
            }
            console.log(JSON.stringify(formErrors));
            if (formValid(formErrors)) {
                history.push("/CustomOrderCheckout");
                // submitted();
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

    // function submitted() {
    //     if(name != undefined && name != "" && email != undefined && email != "" && quantity != undefined && quantity != 0 && context.pictures[0] != undefined) {
    //         if (context.loggedIn == false) {
    //             context.setUserName(name);
    //         }
    //         context.setCustomOrderQuantity(quantity);
    //         var total = quantity * 6;
    //         context.setCustomOrderTotal(total);
    //         // context.customOrderRequest(name, email, specificInstructions, quantity, context.pictures[0]);
    //     }
    //     // formErrors.quantity = "";
    //     // formErrors.overallErrorMessage = "";
    // }

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
                    {/* <Input onChange={(e) => (name = e.target.value)} type="name" name="name" id="exampleName" placeholder="John Doe" autoComplete="off" /> */}
                    {/* <span id="name-error" style={{color: "red"}}>{name}</span> */}
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail"><h4>Email:<br></br> {email}</h4></Label>
                    {/* <Input onChange={(e) => (email = e.target.value)} type="email" name="email" id="exampleEmail" placeholder="na@example.com" autoComplete="off" /> */}
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








// const CustomOrder = () => {

//     const context = useContext(UserContext);

//     // state = {
//     //     name: "",
//     //     email: "",
//     //     specificInstructions: "",
//     //     quantity: ""
//     // }

//     var name;
//     var email;
//     var specificInstructions;
//     var quantity;

//     const history = useHistory();

//     function checkoutClicked() {
//         history.push("/CustomOrderCheckout");
//         submitted();
//     }

//     function onDrop(picture) {
//         context.setPictures(context.pictures.concat(picture));
//     }

//     function submitted() {
//         if(name != undefined && name != "" && email != undefined && email != "" && quantity != undefined && quantity != 0 && context.pictures[0] != undefined) {
//             if (context.loggedIn == false) {
//                 context.setUserName(name);
//             }
//             context.setCustomOrderQuantity(quantity);
//             var total = quantity * 6;
//             context.setCustomOrderTotal(total);
//             context.customOrderRequest(name, email, specificInstructions, quantity, context.pictures[0])
//         }
//     }

//     return (
//         <div>
//             <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
//             <FormGroup id="custom-order-form" className="custom-text">
//                 <Label for="exampleImage"><h4>Upload 1 custom image here</h4></Label>
//                 <ImageUploader
//                     id = "exampleImage"
//                     withIcon={true}
//                     buttonText='Choose images'
//                     onChange={onDrop}
//                     imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                     maxFileSize={5242880}
//                     singleImage={true}
//                     withPreview={true}
//                 />
//                 <FormGroup>
//                     <Label for="exampleName"><h4>First and Last Name</h4></Label>
//                     <Input onChange={(e) => (name = e.target.value)} type="name" name="name" id="exampleName" placeholder="John Doe" autoComplete="off" />
//                     <span id="first-name-error" style={{color: "red"}}>{this.state.formErrors.firstName}</span>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleEmail"><h4>Email</h4></Label>
//                     <Input onChange={(e) => (email = e.target.value)} type="email" name="email" id="exampleEmail" placeholder="na@example.com" autoComplete="off" />
//                     <span id="first-name-error" style={{color: "red"}}>{this.state.formErrors.firstName}</span>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleText"><h4>Specific Instructions</h4></Label>
//                     <Input onChange={(e) => (specificInstructions = e.target.value)} type="textarea" name="text" id="exampleText" autoComplete="off" />
//                     <span id="first-name-error" style={{color: "red"}}>{this.state.formErrors.firstName}</span>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="quantity"><h4>Quantity</h4></Label>
//                     <Input onChange={(e) => (quantity = e.target.value)} type="number" name="text" id="quantity" autoComplete="off" />
//                     <span id="first-name-error" style={{color: "red"}}>{this.state.formErrors.firstName}</span>
//                 </FormGroup>
//                 <Button onClick={checkoutClicked}>Check Out</Button>
//             </FormGroup>
//         </div>
//     );
// }

// export default CustomOrder;


// class CustomOrder extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             name: "",
//             email: "",
//             specificInstructions: "",
//             quantity: 0
//             // history: useHistory()
//         }
//     }

//     checkoutClicked() {
//         // this.state.history.push("/CustomOrderCheckout");
//         this.submitted()
//     }

//     onDrop(picture) {
//         this.context.setPictures(this.context.pictures.concat(picture));
//     }

//     submitted() {
//         if (this.context.loggedIn == false) {
//             this.context.setUserName(this.state.name);
//         }
//         this.context.setCustomOrderQuantity(this.state.quantity);
//         var total = this.state.quantity * 6;
//         this.context.setCustomOrderTotal(total);
//         this.context.customOrderRequest(this.state.name, this.state.email, this.state.specificInstructions, this.state.quantity, this.context.pictures[0]);
//     }

//     render() {
//         return (
//             <div>
//                 <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
//                 <FormGroup id="custom-order-form" className="custom-text">
//                     <FormGroup>
//                         <Label for="exampleName"><h4>First and Last Name</h4></Label>
//                         <Input onChange={(e) => (this.state.name = e.target.value)} type="name" name="name" id="exampleName" placeholder="John Doe" />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="exampleEmail"><h4>Email</h4></Label>
//                         <Input onChange={(e) => (this.state.email = e.target.value)} type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="exampleText"><h4>Specific Instructions</h4></Label>
//                         <Input onChange={(e) => (this.state.specificInstructions = e.target.value)} type="textarea" name="text" id="exampleText" />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="quantity"><h4>Quantity</h4></Label>
//                         <Input onChange={(e) => (this.state.quantity = e.target.value)} type="number" name="text" id="quantity" />
//                     </FormGroup>
//                     <ImageUploader
//                         withIcon={true}
//                         buttonText='Choose images'
//                         onChange={this.onDrop}
//                         imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                         maxFileSize={5242880}
//                         singleImage={true}
//                         withPreview={true}
//                     />
//                     {/* <FormGroup>
//                         <Label for="exampleFile"><h4>Image</h4></Label>
//                         <Input type="file" name="file" id="exampleFile" />
//                         <FormText color="muted">
//                         Choose an image from your own computer to upload. This will be the image on your custom sticker!
//                         </FormText>
//                     </FormGroup> */}
//                     {/* <FormGroup check>
//                         <Label check>
//                         <Input type="checkbox" />{' '}
//                         Check me out
//                         </Label>
//                     </FormGroup> */}
//                     <Link to="/CustomOrderCheckout">
//                         <Button  onClick={this.checkoutClicked}>Check Out</Button>
//                     </Link>
//                 </FormGroup>
//             </div>
//         );
//     }
// }

// CustomOrder.contextType = UserContext;

