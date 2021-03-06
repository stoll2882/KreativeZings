import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap';
import UserContext from '../store/context';

export default class Sticker extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddToCart = this.addToCart.bind(this);
        this.handleDetailsPage = this.viewDetails.bind(this);
        this.handleGetIndex = this.getIndex.bind(this);
    }
    
    addToCart() {
        if (this.context.cart == undefined) {
            this.context.setCart([]);
        }
        if (this.context.cart == undefined || this.context.cart[0] == undefined || this.context.cart.length == 0) {
            this.context.cart = [{id: this.props.id, name: this.props.name, description: this.props.description, image: this.props.image, quantity: 1}];
        } else {
            if (this.handleGetIndex(this.props.id) == -1) {
                this.context.cart.push({id: this.props.id, name: this.props.name, description: this.props.description, image: this.props.image, quantity: 1});
            } else {
                var index = this.handleGetIndex(this.props.id);
                var copyCart = this.context.cart;
                copyCart[index].quantity = copyCart[index].quantity + 1;
                this.context.setCart(copyCart);
            }
        }
        this.context.setCart(this.context.cart);
        this.context.setCartTotal(this.context.cartTotal + 3);
        this.context.updateCart(this.context.userName, this.context.cart);
        this.context.updateTotalPrice(this.context.cart);
    }

    getIndex(id) {
        return this.context.cart.findIndex(obj => obj.id === id);
    }
    
    viewDetails(id) {
        var currentCard = document.getElementById("sticker-card");
    }
    render() {
        const id = this.props.id;
        return (
            <Card className="sticker-card">
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title><h3>{this.props.name}</h3></Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    {
                        this.context.loggedIn ?
                        <Button variant="primary" onClick={this.handleAddToCart}>Add To Cart</Button>:
                        <p>(Login to purchase)</p>
                    }
                </Card.Body>
            </Card>
        );
    }
}

Sticker.contextType = UserContext;
