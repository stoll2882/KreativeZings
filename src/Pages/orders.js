import React, {useContext} from 'react';
import Context from '../store/context';
import Table from 'react-bootstrap/Table';
import PricesTitle from '../Images/PricesTitle.png';
import "bootstrap/dist/css/bootstrap.css";

function Orders () {
    const {state} = useContext(Context);
    return (
        <div>
            <h1><img id="prices-title" src={PricesTitle} alt="Prices"></img></h1>
            <Table striped bordered hover variant="none" id="prices-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Pre-Designed Sticker</td>
                        <td>$3.00</td>
                    </tr>
                    {/* <tr>
                        <td>2</td>
                        <td></td>
                        <td>Medium: $6.00</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                        <td>Large: $10.00</td>
                    </tr> */}
                    <tr>
                        <td>2</td>
                        <td>Custom Image Sticker</td>
                        <td>$6.00</td>
                    </tr>
                    {/* <tr>
                        <td>5</td>
                        <td></td>
                        <td>Medium: $8.00</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                        <td>Large: $13.00</td>
                    </tr> */}
                </thead>
            </Table>
        </div>
    );
}

export default Orders;

import React, { useContext, useState } from 'react'
import Context from '../store/context';
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import LoginTitle from '../Images/LoginTitle.png';
import UserContext from '../store/context';

// const Login = () => {
//     var title = "Login: ";
//     var password = "";

//     // user can login successfully and get a confirmation message

//     const context = useContext(UserContext);

//     function loginClicked(title) {
//         context.logOn(title, password);
//     }

//     if (context.loggedIn && context.authorized == 2) {
//         return (
//             <h1 className="welcome-div">Welcome, {context.userName}!</h1>
//         );
//     } else {
//         return (
//             <div className="custom-text" id="login">
//                 <h1><img id="login-title" src={Login} alt="Prices"></img></h1>
//                 <FormGroup id="login-form">
//                     <h4>Enter username and password below to login!</h4>
//                     <br></br>
//                     <FormGroup>
//                         <Label for="exampleName"><h4>Username</h4></Label>
//                         <Input onChange={(e) => (title = e.target.value)} type="text" />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label for="examplePassword"><h4>Password</h4></Label>
//                         <Input onChange={(e) => (password = e.target.value)} type="password" />
//                     </FormGroup>
//                     {
//                         context.authorized == 1 ?
//                         <h5 style={{color: "red"}}>Username or Password Incorrect</h5>:
//                         <br></br>
//                     }
//                     <Button onClick={() => context.logOn(title, password)}>Login</Button>
//                 </FormGroup>
//             </div>
//         );
//     }
// }

// export default Login;