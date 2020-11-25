import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container, Form, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';

const CreateAccount = () => {
    var title = "Login: ";

    // user can create an account successfully

    const context = useContext(UserContext);

    function createAccountClicked(title) {
        context.logOn(title);
    }

    if (context.loggedIn) {
        return (
            <div className="welcome-div">
                <h1>Thank you for joining, {context.userName}!</h1>
                <h1>Welcome to Kreative Zings!</h1>
            </div>
        );
    } else {
        return (
            <div className="custom-text" id="login">
                <h1 id="login-title">{context.userName}</h1>
                <Form id="login-form">
                    <h4>Enter information below to join the family!</h4>
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
                            <FormGroup>
                                <Label for="exampleEmail>"><h4>Email</h4></Label>
                            <   Input type="text" name="email" id="exampleEmail" placeholder="john@doe.com"></Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleName"><h4>Username</h4></Label>
                                <Input onChange={(e) => (title = e.target.value)} type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword"><h4>Password</h4></Label>
                                <Input type="password" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={() => context.logOn(title)}>Create Account</Button>
                </Form>
            </div>
        );
    }
}

export default CreateAccount;