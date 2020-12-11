import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';

const Login = () => {
    var title = "Login: ";
    var password = "";

    // user can login successfully and get a confirmation message

    const context = useContext(UserContext);

    function loginClicked(title) {
        context.logOn(title, password);
    }

    if (context.loggedIn && context.authorized == 2) {
        return (
            <h1 className="welcome-div">Welcome, {context.userName}!</h1>
        );
    } else {
        return (
            <div className="custom-text" id="login">
                <h1 id="login-title">Login</h1>
                <FormGroup id="login-form">
                    <h4>Enter username and password below to login!</h4>
                    <br></br>
                    <FormGroup>
                        <Label for="exampleName"><h4>Username</h4></Label>
                        <Input onChange={(e) => (title = e.target.value)} type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword"><h4>Password</h4></Label>
                        <Input onChange={(e) => (password = e.target.value)} type="password" />
                    </FormGroup>
                    {
                        context.authorized == 1 ?
                        <h5 style={{color: "red"}}>Username or Password Incorrect</h5>:
                        <br></br>
                    }
                    <Button onClick={() => context.logOn(title, password)}>Login</Button>
                </FormGroup>
            </div>
        );
    }
}

export default Login;
