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
import context from 'react-bootstrap/esm/AccordionContext';
import Profile from './DetailPages/profile';

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

    function logOn(userName, password) {
        setAuthorized(0);
        console.log("trying to logon" + userName);
        axios.get('http://localhost:3002/user/' + userName + '/' + password).then((response) => {
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
        axios.get('http://localhost:3002/orderPayment/' + userName).then((response) => {
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

    // function createAccount(firstName, lastName, userName, password, email, phoneNumber) {
    //     var user = { 
    //         firstName: firstName,
    //         lastName: lastName,
    //         userName: userName,
    //         password: password,
    //         email: email,
    //         phoneNumber: phoneNumber
    //     }
    //     axios.post('http://localhost:3002/user/', user).then((response) => {
    //         if (response.status == 201) {
    //             setAuthorized(2);
    //             setUserName(userName);
    //             setCookie("userName", userName);
    //             setEmail(email);
    //             setName(firstName + " " + lastName);
    //             setLoggedIn(true);
    //             console.log("login worked");
    //             console.log(response.data);
    //         } else {

    //         }
    //     });
    // }

    // function contactMeRequest(name, email, reasonForContact, message) {
    //     var request = {
    //         name: name,
    //         email: email,
    //         reasonForContact: reasonForContact,
    //         message: message
    //     }
    //     axios.post('http://localhost:3002/contactMe/', request).then((response) => {
    //         if (response.status == 201) {
    //             if (response.status == 200) {
    //                 console.log("email sent");
    //             } else {
    //                 console.log("email failed to send")
    //             }
    //         }
    //     });
    // }

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

    // function customOrderRequest(name, email, specificInstruction, quantity, image) {
    //     var data = new FormData();
    //     data.append("image", image);
    //     axios.post('http://localhost:3002/customOrderRequest/' + name + "/" + email + "/" + specificInstruction + "/" + quantity, data).then((response) => {
    //         if (response.status == 201) {
    //             if (response.status == 200) {
    //                 console.log("email sent");
    //             } else {
    //                 console.log("email failed to send")
    //             }
    //         }
    //     });
    // }

    // function checkOutOrderSubmit(name, email, address, creditCardInfo, orderInfo) {
    //     updateCart(userName, []);
    //     var checkoutInformation = {
    //         userName: userName,
    //         name: name,
    //         email: email,
    //         address: address,
    //         creditCardInfo: creditCardInfo,
    //         orderInfo: orderInfo
    //     }
    //     axios.post('http://localhost:3002/orderPayment/', checkoutInformation).then((response) => {
    //         if (response.status == 200) {
    //             console.log("information written to back end");
    //         } else {
    //             console.log("information failed to write to back end")
    //         }
    //     });
    // }

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
        // axios.get('http://localhost:3002/user/' + userName).then((response) => {
        //     console.log(response.status);
        //     if (response.status == 200) {
        //         setEmail(response.data.email);
        //         setName(response.data.firstName + " " + response.data.lastName);
        //         console.log("login worked");
        //         setCookie("userName", userName);
        //     } else {
        //         console.log("failed to login");
        //     }
        // });
    }

    // say a different message if cartloading is true
    if (loggedIn == true && cart == undefined && loadingCart == false) {
        setLoadingCart(true);
        axios.get('http://localhost:3002/cart/' + userName).then((response) => {
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
        // createAccount: createAccount,
        cart: cart,
        loadingCart: loadingCart,
        updateCart: updateCart,
        setCart: setCart,
        cartTotal: cartTotal,
        setCartTotal: setCartTotal,
        updateTotalPrice: updateTotalPrice,
        // contactMeRequest: contactMeRequest,
        // customOrderRequest: customOrderRequest,
        pictures: pictures,
        setPictures: setPictures,
        contactFormSubmitted: contactFormSubmitted,
        setContactFormSubmitted: setContactFormSubmitted,
        customOrderTotal: customOrderTotal,
        setCustomOrderTotal: setCustomOrderTotal,
        customOrderQuantity: customOrderQuantity,
        setCustomOrderQuantity: setCustomOrderQuantity,
        // checkOutOrderSubmit: checkOutOrderSubmit,
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