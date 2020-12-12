import React, {useContext} from 'react';
// import Context from '../store/context';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import userContext from '../store/context';

// import profileIcon from '../Images/profileIcon.png';
// import shoppingCartIcon from '../Images/shoppingCart.png';
// import shoppingIconIcon from '../Images/shoppingIcon.png';

const NavBar = () => {
    const context = useContext(userContext);
    var title = "Profile";
    if (context.loggedIn) {
        title = context.userName
    }
    return (
        <Navbar bg="light" expand="lg" sticky='top' className="nav-bar">
            <LinkContainer to="HomePage">
                <Navbar.Brand style={{fontSize:"2rem"}}>Kreative Zings</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    context.loggedIn ?
                    <Nav className="container-fluid" activeKey={window.location.pathname}>
                        <LinkContainer to="AboutMe">
                            <Nav.Link>AboutMe</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="Stickers">
                            <Nav.Link>Stickers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="CustomOrder">
                            <Nav.Link>Custom Order</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="Prices">
                            <Nav.Link>Prices</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="ContactMe">
                            <Nav.Link>Contact Me</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="ShoppingCart" className="ml-auto">
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title={title} id="basic-nav-dropdown">
                            <LinkContainer to="Profile">
                                <NavDropdown.Item>View Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="Login">
                                <NavDropdown.Item onClick={() => context.logOut()}>Logout</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    :
                    <Nav className="container-fluid" activeKey={window.location.pathname}>
                        <LinkContainer to="AboutMe">
                            <Nav.Link>AboutMe</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="Stickers">
                            <Nav.Link>Stickers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="Prices">
                            <Nav.Link>Prices</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="ContactMe">
                            <Nav.Link>Contact Me</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title={title} id="basic-nav-dropdown" className="ml-auto">
                            <LinkContainer to="Login">
                                <NavDropdown.Item>Login</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="CreateAccount">
                                <NavDropdown.Item>Create Account</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar> 
    )
}

export default NavBar;

{/* <Nav.Link href="./AboutMe">AboutMe</Nav.Link>
<Nav.Link href="./Stickers">Stickers</Nav.Link>
<Nav.Link href="./CustomOrder">Custom Order</Nav.Link>
<Nav.Link hred="./Prices">Prices</Nav.Link>
<Nav.Link href="./ContactMe">Contact me</Nav.Link>
<Nav.Link href="./ShoppingCart" className="ml-auto">Cart</Nav.Link>
<Nav.Link href="./Checkout">Checkout</Nav.Link>
<NavDropdown title="Profile" id="basic-nav-dropdown">
    <NavDropdown.Item href="./Login">Login</NavDropdown.Item>
    <NavDropdown.Item href="./CreateAccount">Create Account</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
</NavDropdown> */}