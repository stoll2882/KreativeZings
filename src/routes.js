import React, { useState } from 'react';
import HomePage from './Pages/HomePage';
import AboutMe from './Pages/AboutMe';
import Stickers from './Pages/Stickers';
import CustomOrder from './Pages/CustomOrder';
import ContactMe from './Pages/ContactMe';
import ShoppingCart from './DetailPages/ShoppingCart'
import './styles.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Prices from './Pages/Prices';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import UserContext from './store/context';
import axios from "axios";
import { useCookies } from 'react-cookie';

function Routes () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authorized, setAuthorized] = useState(0);
    const [userName, setUserName] = useState("");
    const [cart, setCart] = useState();
    const [loadingCart, setLoadingCart] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [cookies, setCookie] = useCookies(["userName"]);

    function logOn(userName, password) {
        setAuthorized(0);
        console.log("trying to logon" + userName);
        axios.get('http://localhost:3002/user/' + userName + '/' + password).then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                setAuthorized(2);
                setUserName(userName);
                setLoggedIn(true);
                console.log("login worked");
                console.log(response.data);
                setCookie("userName", userName);
            } else {
                setAuthorized(1);
                console.log("failed to login");
            }
        }).catch((error) => {
            setAuthorized(1);
            console.log(error);
        });
    }

    function logOut() {
        setCookie("userName", "");
        setUserName("");
        setLoggedIn(false);
    }

    function createAccount(firstName, lastName, userName, password, email, phoneNumber) {
        var user = { 
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            email: email,
            phoneNumber: phoneNumber
        }
        axios.post('http://localhost:3002/user/', user).then((response) => {
            if (response.status == 201) {
                setAuthorized(2);
                setUserName(userName);
                setLoggedIn(true);
                console.log("login worked");
                console.log(response.data);
            }
        });
    }

    // function to update the cart once an item has been added
    function updateCart(userName, cart) {
        console.log("writing cart...");
        axios.post('http://localhost:3002/cart/' + userName, cart).then((response) => {
            if (response.status == 200) {
                console.log("cart written to back end");
            } else {
                console.log("cart failed to write to back end")
            }
        });
    }

    // if username does not exist already... i.e user is not logged in... cookies the username and login user
    if (userName == "" || userName == undefined) {
        let currentUserName = cookies["userName"];
        if (currentUserName != "" && currentUserName != undefined) {
            setUserName(currentUserName);
            setLoggedIn(true);
        }
    }

    // say a different message if cartloading is true
    if (loggedIn == true && cart == undefined && loadingCart == false) {
        setLoadingCart(true);
        axios.get('http://localhost:3002/cart/' + userName).then((response) => {
            setCart(response.data);
            setLoadingCart(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const value = { 
        loggedIn: loggedIn,
        authorized: authorized,
        userName: userName,
        setLoggedIn: setLoggedIn,
        setUserName: setUserName,
        logOn: logOn,
        logOut: logOut,
        createAccount: createAccount,
        cart: cart,
        loadingCart: loadingCart,
        updateCart: updateCart,
        setCart: setCart,
        cartTotal: cartTotal,
        setCartTotal: setCartTotal
    };

    return (
        <UserContext.Provider value={value}>
            <NavBar />
            <Route exact path="/" render={() => {
                return (
                    <Redirect to="/HomePage" />
                )
            }}/>
            <Route path="/HomePage">
                <HomePage />
            </Route>
            <Route path="/AboutMe">
                <AboutMe />
            </Route>
            <Route exact path="/Stickers">
                <Stickers />
            </Route>
            <Route exact path="/CustomOrder">
                <CustomOrder />
            </Route>
            <Route exact path="/Prices">
                <Prices />
            </Route>
            <Route exact path="/ContactMe">
                <ContactMe />
            </Route>
            <Route exact path="/ShoppingCart">
                <ShoppingCart />
            </Route> 
            <Route exact path="/Checkout">
                <Checkout />
                </Route>
            <Route exact path="/Login">
                <Login />
            </Route>
            <Route exact path="/CreateAccount">
                <CreateAccount />
            </Route>
        </UserContext.Provider>
    )
};

export default Routes;