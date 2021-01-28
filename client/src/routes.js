import React, { useState } from 'react';
import HomePage from './Pages/HomePage';
import AboutMe from './Pages/AboutMe';
import Stickers from './Pages/Stickers';
import CustomOrder from './Pages/CustomOrder';
import ContactMe from './Pages/ContactMe';
import ShoppingCart from './DetailPages/ShoppingCart';
import CustomOrderCheckout from './Pages/CustomOrderCheckout';
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
import Profile from './DetailPages/profile';
import baseUrl from './baseurl';

function Routes () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [authorized, setAuthorized] = useState(0);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cart, setCart] = useState();
    const [loadingCart, setLoadingCart] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [cookies, setCookie] = useCookies(["userName", "email", "name"]);
    const [pictures, setPictures] = useState([]);
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
    const [customOrderTotal, setCustomOrderTotal] = useState(0);
    const [customOrderQuantity, setCustomOrderQuantity] = useState(0);
    const [userOrders, setUserOrders] = useState([]);

    console.log(baseUrl());

    function logOn(userName, password) {
        setAuthorized(0);
        console.log("trying to logon" + userName);
        axios.get(baseUrl() + 'user/' + userName + '/' + password).then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                setAuthorized(2);
                setUserName(userName);
                setEmail(response.data.email);
                setName(response.data.firstName + " " + response.data.lastName);
                setLoggedIn(true);
                console.log("login worked");
                console.log(response.data);
                setCookie("userName", userName);
                setCookie("email", response.data.email);
                setCookie("name", response.data.firstName + " " + response.data.lastName);
                getUserOrders(userName);
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
        setName("");
        setEmail("");
        setLoggedIn(false);
        setAuthorized(0);
    }

    function getUserOrders(userName) {
        axios.get(baseUrl() + 'orderPayment/' + userName).then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                console.log("got orders");
                console.log(response.data);
                setUserOrders(response.data.orderArray)
            } 
        }).catch((error) => {
            console.log(error);
        });
    }

    // function to update the cart once an item has been added
    function updateCart(userName, cart) {
        console.log("writing cart...");
        axios.post(baseUrl() + 'cart/' + userName, cart).then((response) => {
            if (response.status == 200) {
                console.log("cart written to back end");
            } else {
                console.log("cart failed to write to back end")
            }
        });
    }

    function updateTotalPrice(cart) {
        var total = 0;
        if (cart != undefined) {
            var quantity;
            for (var i = 0; i < cart.length; i++) {
                quantity = cart[i].quantity;
                total = total + (quantity * 3);
            }
        }
        setCartTotal(total);
    }

    // if username does not exist already... i.e user is not logged in... cookies the username and login user
    if (userName == "" || userName == undefined) {
        let currentUserName = cookies["userName"];
        let currentUserEmail = cookies["email"];
        let currentName = cookies["name"];
        if (currentUserName != "" && currentUserName != undefined) {
            setUserName(currentUserName);
            setLoggedIn(true);
            updateTotalPrice(cart);
            setUserOrders([]);
            getUserOrders(currentUserName);
            if (currentUserEmail != "" && currentUserEmail != undefined) {
                setEmail(currentUserEmail);
            } else {
                setEmail("no email known");
            }
            if (currentName != "" && currentName != undefined) {
                setName(currentName);
            } else {
                setName("no name known");
            }
            setLoadingCart(false);
        }
    }

    // say a different message if cartloading is true
    if (loggedIn == true && cart == undefined && loadingCart == false) {
        setLoadingCart(true);
        axios.get(baseUrl() + 'cart/' + userName).then((response) => {
            setCart(response.data);
            setLoadingCart(false);
            updateTotalPrice(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const value = { 
        loggedIn: loggedIn,
        authorized: authorized,
        setAuthorized: setAuthorized,
        userName: userName,
        setLoggedIn: setLoggedIn,
        setUserName: setUserName,
        email: email,
        setEmail: setEmail,
        name: name,
        setName: setName,
        logOn: logOn,
        logOut: logOut,
        cart: cart,
        loadingCart: loadingCart,
        updateCart: updateCart,
        setCart: setCart,
        cartTotal: cartTotal,
        setCartTotal: setCartTotal,
        updateTotalPrice: updateTotalPrice,
        pictures: pictures,
        setPictures: setPictures,
        contactFormSubmitted: contactFormSubmitted,
        setContactFormSubmitted: setContactFormSubmitted,
        customOrderTotal: customOrderTotal,
        setCustomOrderTotal: setCustomOrderTotal,
        customOrderQuantity: customOrderQuantity,
        setCustomOrderQuantity: setCustomOrderQuantity,
        userOrders: userOrders,
        setUserOrders: setUserOrders,
        getUserOrders: getUserOrders,
        cookies: cookies,
        setCookie: setCookie
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
            <Route exact path="/CustomOrderCheckout">
                <CustomOrderCheckout />
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
            <Route exact path="/Profile">
                <Profile />
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