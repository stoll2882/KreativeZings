import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import LoginTitle from '../Images/LoginTitle.png';
import UserContext from '../store/context';

const Login = () => {
    var title = "Login: ";
    var password = "";

    // user can login successfully and get a confirmation message

    const context = useContext(UserContext);

    function loginClicked() {
        document.getElementById("username-input").value = "";
        document.getElementById("password-input").value = "";
        context.logOn(title, password);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (name == "title") {
            title = value;
        } else if (name == "password") {
            password = value;
        }
    }

    if (context.loggedIn && context.authorized == 2) {
        return (
            <h1 className="welcome-div">Welcome, {context.userName}!</h1>
        );
    } else {
        return (
            <div className="custom-text" id="login">
                <h1><img id="login-title" src={LoginTitle} alt="Login"></img></h1>
                <FormGroup id="login-form">
                    <h4>Enter username and password below to login!</h4>
                    <br></br>
                    <FormGroup>
                        <Label for="exampleName"><h4>Username</h4></Label>
                        <Input onChange={handleChange} type="text" id="username-input" name="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword"><h4>Password</h4></Label>
                        <Input onChange={handleChange} type="password" id="password-input" name="password"/>
                    </FormGroup>
                    {
                        context.authorized == 1 && context.authorized != 0 ?
                        <h5 style={{color: "red"}}>Username or Password Incorrect</h5>:
                        <br></br>
                    }
                    <Button onClick={loginClicked} name="button">Login</Button>
                </FormGroup>
            </div>
        );
    }
}

export default Login;
