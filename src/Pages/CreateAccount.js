import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container, Form, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';

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
            phoneNumber: null,
            formErrors: {
                title: "",
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                password: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // user can create an account successfully

    // const context = useContext(UserContext);

    handleSubmit (e) {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {
            this.context.setUserName(this.state.title);
            this.context.createAccount(this.state.firstName, this.state.lastName, this.state.title, this.state.password, this.state.email, this.state.phoneNumber)
            this.context.setLoggedIn(true);
            console.log("submitting form... First name: " + this.state.firstName + " Last name: " + this.state.lastName);
        } else {
            console.log("form invalid");
        }
    }

    handleChange(e) {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrorList = this.state.formErrors;

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
                    <h1 id="login-title">{this.state.userName}</h1>
                    <Form id="login-form">
                        <h4>Enter information below to join the family!</h4>
                        <br></br>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleFirstName"><h4>First Name</h4></Label>
                                    <Input onChange={this.handleChange} type="name" name="firstName" id="exampleFirstName" placeholder="John" />
                                    {this.state.formErrors.firstName.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.firstName}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleLastName"><h4>Last Name</h4></Label>
                                    <Input onChange={this.handleChange} type="name" name="lastName" id="exampleLastName" placeholder="Doe" />
                                    {this.state.formErrors.lastName.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.lastName}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleName"><h4>Username</h4></Label>
                                    <Input onChange={(e) => this.handleChange(e)} type="text" name="title"/>
                                    {this.state.formErrors.title.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.title}</span>
                                    )}
                                    {/* <Input onChange={(e) => (this.state.title = e.target.value)} type="text" /> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="examplePassword"><h4>Password</h4></Label>
                                    <Input onChange={this.handleChange} type="password" name="password"/>
                                    {this.state.formErrors.password.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.password}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail>"><h4>Email</h4></Label>
                                    <Input onChange={this.handleChange} type="text" name="email" id="exampleEmail" placeholder="john@doe.com"></Input>
                                    {this.state.formErrors.email.length > 0 && (
                                        <span style={{color: "red"}}>{this.state.formErrors.email}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="examplePhoneNumber>"><h4>Phone Number</h4></Label>
                                    <Input onChange={this.handleChange} type="phoneNumber" name="phoneNumber" id="examplePhoneNumber" placeholder="(888) 888-8888"></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button onClick={this.handleSubmit}>Create Account</Button>
                    </Form>
                </div>
            );
        }
    }   
}

CreateAccount.contextType = UserContext;

export default CreateAccount;