import React, { useContext } from 'react';
import Me from '../Images/me.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import UserContext from '../store/context';


function Profile () {

    const context = useContext(UserContext);

    return (
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
    )
};

export default Profile;