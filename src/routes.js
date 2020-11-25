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

function Routes () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    function logOn(userName) {
        setUserName(userName);
        setLoggedIn(true);
    }

    function logOut() {
        setUserName("");
        setLoggedIn(false);
    }

    function createAccount(userName) {
        setUserName(userName);
        setLoggedIn(true);
    }

    const value = { 
        loggedIn: loggedIn,
        userName: userName,
        setLoggedIn: setLoggedIn,
        setUserName: setUserName,
        logOn: logOn,
        logOut: logOut,
        createAccount: createAccount,
        cart: cart,
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