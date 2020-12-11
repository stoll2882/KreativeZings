import React, { useContext } from 'react';
import Me from '../Images/me.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import UserContext from '../store/context';
import Table from 'react-bootstrap/Table';

function Profile () {

    const context = useContext(UserContext);
    var userOrders = context.userOrders;

    return (
        <div>
            <Container fluid className="custom-text" style={{marginTop: "5vh"}}>
                <Row>
                    <Col md={12}>
                        <h1>Profile</h1>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md={4}>
                        <h2>Name:</h2>
                        <h4>{context.name}</h4>
                    </Col>
                    <Col md={4}>
                        <h2>Username:</h2>
                        <h4>{context.userName}</h4>
                    </Col>
                    <Col md={4}>
                        <h2>Email:</h2>
                        <h4>{context.email}</h4>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="custom-text" style={{marginTop: "5vh"}}>
                <h1>My Orders</h1>
                <Table striped bordered hover variant="none" id="prices-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Items</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOrders.map( (order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        {
                                            order.orderInfo.orderTpe == "catalog" ?
                                            <ul style={{listStyleType: "none"}}>
                                                {
                                                    order.orderInfo.cart.map( (item) => {
                                                        return (
                                                            <li key={item.id}>{item.name} - {item.quantity}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            :
                                            <span>Custom Order - {order.orderInfo.quantity}</span>
                                        }
                                    </td>
                                    <td>${order.orderInfo.total}.00</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
                </Table>
            </Container>
        </div>
    )
};

export default Profile;