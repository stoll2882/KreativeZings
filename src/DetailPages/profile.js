import React, { useContext } from 'react';
import Me from '../Images/me.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import UserContext from '../store/context';


function Profile () {

    const context = useContext(UserContext);

    return (
        <Container fluid>
            <Row>
                <Col md={5}>
                    <h1>userName:</h1>
                    <h3>{context.userName}</h3>
                </Col>
                <Col md={6}>
                    <h1 id="aboutme-page-description">Hi, I'm Sam...</h1>
                </Col>
            </Row>
            <br></br>
            <Row>
                <p id="about-me-text"> I am a third year Computer Science major at Gonzaga University. I run this small business named Kreative Zings where I turn my personal artwork into
                    stickers and sell them online. I have been creating virtual art for about 3 years now, and decided to turn it into a small business! My passions involve art, 
                    music, and athletics as I am a member of the D1 rowing team at my school. I create stickers with meaningful and happy sayings with a goal to inspire others. I also
                    allow uploads of personal images (on the custom tab) in order to create your own custom sticker. Hope you enjoy! :)
                </p>
            </Row>
        </Container>
    )
};

export default Profile;