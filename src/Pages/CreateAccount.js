import React, { useContext, useState } from 'react'
import Context from '../store/context';
import CreateAccountTitle from '../Images/CreateAccountTitle.png';
import { Button, FormGroup, Label, Input, FormText, Container, Form, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';
import axios from "axios";

const emailRegrex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });
    return valid;
}

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            firstName: null,
            lastName: null,
            password: null,
            email: null,
            userNameApproved: null,
            phoneNumber: null,
            formErrors: {
                title: "",
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                password: "",
                userNameApproved: "",
                overallErrorMessage: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    createAccount() {
        var user = { 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.title,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        }
        axios.post('http://localhost:3002/user/', user).then((response) => {
            if (response.status == 201 && formValid(this.state.formErrors) == true) {
                this.context.setAuthorized(2);
                this.context.setUserName(this.state.userName);
                this.context.setCookie("userName", this.state.userName);
                this.context.setEmail(this.state.email);
                this.context.setName(this.state.firstName + " " + this.state.lastName);
                this.context.setLoggedIn(true);
                console.log("login worked");
                console.log(response.data);
                this.context.logOn(user.userName, user.password);
            } else {
                this.state.formErrors.overallErrorMessage = "CREATE ACCOUNT ERROR: " + "\n";

                if (response.data.firstName != null) {
                    this.state.formErrors.overallErrorMessage = this.state.formErrors.overallErrorMessage + response.data.firstName + "\n";
                    // document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
                }
                if (response.data.lastName != null) {
                    this.state.formErrors.overallErrorMessage = this.state.formErrors.overallErrorMessage + response.data.lastName + "\n";
                    // document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
                }
                if (response.data.userName != null) {
                    this.state.formErrors.overallErrorMessage = this.state.formErrors.overallErrorMessage + response.data.userName + "\n";
                    // document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
                }
                if (response.data.password != null) {
                    this.state.formErrors.overallErrorMessage = this.state.formErrors.overallErrorMessage + response.data.password + "\n";
                    // document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
                }
                if (response.data.email != null) {
                    this.state.formErrors.overallErrorMessage = this.state.formErrors.overallErrorMessage + response.data.email + "\n";
                    // document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
                }
                document.getElementById("overall-error-message").innerHTML = this.state.formErrors.overallErrorMessage;
            }
        });
    }

    handleSubmit (e) {
        e.preventDefault();

        document.getElementById("first-name-input").value = "";
        document.getElementById("last-name-input").value = "";
        document.getElementById("password-input").value = "";
        document.getElementById("email-input").value = "";
        document.getElementById("phone-number-input").value = "";

        document.getElementById("first-name-error").innerHTML = "";
        document.getElementById("last-name-error").innerHTML = "";
        document.getElementById("username-error").innerHTML = "";
        document.getElementById("password-error").innerHTML = "";
        document.getElementById("email-error").innerHTML = "";

        if (this.checkUsernameAvailability() == false) {
            document.getElementById("username-input").value = "";
        }
        this.createAccount();

        // if (formValid(this.state.formErrors)) {
        //     this.context.setUserName(this.state.title);
        //     this.context.createAccount(this.state.firstName, this.state.lastName, this.state.title, this.state.password, this.state.email, this.state.phoneNumber)
        //     this.context.setLoggedIn(true);
        //     console.log("submitting form... First name: " + this.state.firstName + " Last name: " + this.state.lastName);
        // } else {
        //     console.log("form invalid");
        // }
    }

    checkUsernameAvailability() {
        let formErrorList = this.state.formErrors;
        axios.get('http://localhost:3002/user/' + this.state.title).then((response) => {
            this.setState({formErrorList, userNameApproved: "This username is already taken"});
            return true;
        }).catch((error) => {
            this.setState({formErrorList, userNameApproved: ""});
            console.log(error);
            return false;
        })

    }

    handleChange(e) {
        e.preventDefault();
        document.getElementById("overall-error-message").innerHTML = "";

        const { name, value } = e.target;
        let formErrorList = this.state.formErrors;
        this.setState({formErrorList, overallErrorMessage: ""});
        this.setState({formErrorList, userNameApproved: ""});

        switch(name) {
            case "firstName":
                formErrorList.firstName = value.length < 3 && value.length > 0 ? 
                "minimum 3 characters required": ""
                break;
            case "lastName":
                formErrorList.lastName = value.length < 3 && value.length > 0 ? 
                "minimum 3 characters required": ""
                break;
            case "email":                
                formErrorList.email = emailRegrex.test(value) && value.length > 0 ? 
                "": "invalid email address"
                break;
            case "password":
                formErrorList.password = value.length < 8 && value.length > 0 ? 
                "minimum 8 characters required": ""
                break;
            case "title":
                formErrorList.title = value.length < 3 && value.length > 0 ? 
                "minimum 3 characters required": ""
                break;
            case "phonenumber":
                formErrorList.phoneNumber = value.length < 3 && value.length > 0 ? 
                "minimum 3 characters required": ""
                break;
        }
        this.setState({formErrorList, [name]: value}, () => {
            console.log(this.state);
        });
    }

    render() {
        if (this.context.loggedIn) {
            return (
                <div className="welcome-div">
                    <h1>Thank you for joining, {this.state.title}!</h1>
                    <h1>Welcome to Kreative Zings!</h1>
                </div>
            );
        } else {
            return (
                <div className="custom-text" id="login">
                <h1><img id="create-account-title" src={CreateAccountTitle} alt="Create Account"></img></h1>
                    <Form id="login-form">
                        <h4>Enter information below to join the family!</h4>
                        <br></br>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleFirstName"><h4>First Name*</h4></Label>
                                    <Input onChange={this.handleChange} type="name" name="firstName" id="first-name-input" placeholder="John" autoComplete="off" />
                                    <span id="first-name-error" style={{color: "red"}}>{this.state.formErrors.firstName}</span>
                                    {/* {this.state.formErrors.firstName.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.firstName}</span>
                                    )} */}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleLastName"><h4>Last Name*</h4></Label>
                                    <Input onChange={this.handleChange} type="name" name="lastName" id="last-name-input" placeholder="Doe" autoComplete="off" />
                                    <span id="last-name-error" style={{color: "red"}}>{this.state.formErrors.lastName}</span>
                                    {/* {this.state.formErrors.lastName.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.lastName}</span>
                                    )} */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleName"><h4>Username*<h6 id="approved-username" style={{color: "red"}}>  {this.state.userNameApproved}</h6></h4></Label>
                                    <Input onChange={(e) => this.handleChange(e)} type="text" name="title" id="username-input" autoComplete="off" />
                                    <span id="username-error" style={{color: "red"}}>{this.state.formErrors.title}</span>
                                    {/* {this.state.formErrors.title.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.title}</span>
                                    )} */}
                                    {/* <Input onChange={(e) => (this.state.title = e.target.value)} type="text" /> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="examplePassword"><h4>Password*</h4></Label>
                                    <Input onChange={this.handleChange} type="password" name="password" id="password-input" autoComplete="off" />
                                    <span id="password-error" style={{color: "red"}}>{this.state.formErrors.password}</span>
                                    {/* {this.state.formErrors.password.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.password}</span>
                                    )} */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail>"><h4>Email*</h4></Label>
                                    <Input onChange={this.handleChange} type="text" name="email" id="exampleEmail" id="email-input" placeholder="john@doe.com" autoComplete="off"></Input>
                                    <span id="email-error" style={{color: "red"}}>{this.state.formErrors.email}</span>
                                    {/* {this.state.formErrors.email.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.email}</span>
                                    )} */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="examplePhoneNumber>"><h4>Phone Number</h4></Label>
                                    <Input onChange={this.handleChange} type="phoneNumber" name="phoneNumber" id="phone-number-input" placeholder="(888) 888-8888" autoComplete="off"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span id="overall-error-message" style={{color: "red"}}>{this.state.formErrors.overallErrorMessage}</span>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <FormGroup>
                                    <Input type="button" value="Create Account" id="btnsubmit" onClick={this.handleChange} style={{boxShadow: "0px 0px 0px 3px black"}}></Input>
                                </FormGroup>
                            </Col>
                        </Row> */}
                        <Button onClick={this.handleSubmit}>Create Account</Button>
                    </Form>
                </div>
            );
        }
    }   
}

CreateAccount.contextType = UserContext;

export default CreateAccount;