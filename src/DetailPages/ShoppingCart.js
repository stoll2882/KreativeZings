import React, {useContext} from 'react';
import Context from '../store/context';
import Table from 'react-bootstrap/Table';
import ShoppingCartTitle from '../Images/ShoppingCartTitle.png';
import "bootstrap/dist/css/bootstrap.css";
import UserContext from '../store/context';
import LinkContainer from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Checkout from '../Pages/Checkout';

function ShoppingCart () {
    const context = useContext(UserContext);
    var cartLength;
    if (context.cart != null) {
      cartLength = context.cart.length;
    } else {
      cartLength = 0;
    }

    // shopping cart function that holds the current users shopping cart 

    function remove(id) {
        var indexOfItemToRemove = getIndex(id);
        var toRemove = context.cart[indexOfItemToRemove].quantity * 3;
        context.cart.splice(indexOfItemToRemove, 1);
        var newCartTotal = (context.cartTotal - toRemove);
        context.setCartTotal(newCartTotal);
        context.setCart(context.cart);
        context.updateCart(context.userName, context.cart);
    }

    function getIndex(id) {
      return context.cart.findIndex(obj => obj.id === id);
    }
    const history = useHistory();

    function checkoutClicked() {
      history.push("/Checkout");
    }

    return (
        <div className="custom-text">
            <h1><img id="prices-title" src={ShoppingCartTitle} alt="Prices"></img></h1>

            <Table striped bordered hover variant="none" id="prices-table">
                <thead>
                    <tr style={{fontSize: "larger"}}>
                        <th>ID#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                    {
                      cartLength != 0 ?
                        context.cart.map( (item) => {
                          return (
                            <tr id={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td>${item.quantity * 3}.00</td>
                              <td><button onClick={() => remove(item.id)}>remove</button></td>
                            </tr>
                          )
                        }):
                        <tr></tr>
                    }
                    <tr style={{fontSize: "larger"}}>
                        <th>Total:</th>
                        <td></td>
                        <td></td>
                        <th id="total-price">${context.cartTotal}.00</th>
                    </tr>
                </thead>
            </Table>
            {
              cartLength != 0 ?
                <Button onClick={checkoutClicked} style={{marginTop: "3vh", fontSize: "2rem", alignSelf: "center", background: "black", color: "white", outline: "black", boxShadow: "1px 1px 12px black", borderRadius: "20px"}}>Checkout</Button>:
                <h3>Cart is Empty, Add an Item to Checkout</h3>
            }
        </div>
    );
}

export default ShoppingCart;