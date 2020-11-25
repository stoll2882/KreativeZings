import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';

const Login = () => {
    // const [value, setValue] = useState("Profile");
    // const {state, actions} = useContext(Context);
    var title = "Login: ";

    const context = useContext(UserContext);

    function loginClicked(title) {
        context.logOn(title);
    }

    if (context.loggedIn) {
        return (
            <h1 className="welcome-div">Welcome, {context.userName}!</h1>
        );
    } else {
        return (
            <div className="custom-text" id="login">
                <h1 id="login-title">{context.userName}</h1>
                {/* <FormGroup id="login-form">
                    <h4>Enter username and password below to login!</h4>
                    <br></br>
                    <FormGroup>
                        <Label for="exampleName"><h4>Username</h4></Label>
                        <Input onChange={(e) => (title = e.target.value)} type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword"><h4>Password</h4></Label>
                        <Input type="password" />
                    </FormGroup>
                    <Button onClick={() => context.logOn(title)}>Login</Button>
                </FormGroup> */}
            </div>
        );
    }
}

export default Login;
