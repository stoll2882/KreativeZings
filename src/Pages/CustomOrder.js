import React from 'react'
import { Button, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import CustomOrderTitle from '../Images/CustomOrdersTitle.png';

function CustomOrder() {
        return (
        <div>
            <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
            <FormGroup id="custom-order-form" className="custom-text">
                <FormGroup>
                    <Label for="exampleName"><h4>First and Last Name</h4></Label>
                    <Input type="name" name="name" id="exampleName" placeholder="John Doe" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail"><h4>Email</h4></Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="na@example.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText"><h4>Specific Instructions</h4></Label>
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                    <Label for="quantity"><h4>Quantity</h4></Label>
                    <Input type="number" name="text" id="quantity" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile"><h4>Image</h4></Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                    Choose an image from your own computer to upload. This will be the image on your custom sticker!
                    </FormText>
                </FormGroup>
                {/* <FormGroup tag="fieldset">
                    <legend>Radio Buttons</legend>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option one is this and that—be sure to include why it's great
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option two can be something else and selecting it will deselect option one
                    </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                    <Label check>
                        <Input type="radio" name="radio1" disabled />{' '}
                        Option three is disabled
                    </Label>
                    </FormGroup>
                </FormGroup> */}
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" />{' '}
                    Check me out
                    </Label>
                </FormGroup>
                <Button>Submit</Button>
            </FormGroup>
        </div>
    );
}

export default CustomOrder;















// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { Component } from 'react';
// import {
//   Container, Col, Form,
//   FormGroup, Label, Input,
//   Button,
// } from 'reactstrap';
// // import './App.css';

// class CustomOrder extends Component {
//   render() {
//     return (
//       <Container className="hasSuccess">
//         <h2>Sign In</h2>
//         <Form className="form">
//           <Col>
//             <FormGroup>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 id="exampleEmail"
//                 placeholder="myemail@email.com"
//               />
//             </FormGroup>
//           </Col>
//           <Col>
//             <FormGroup>
//               <Label for="examplePassword">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="examplePassword"
//                 placeholder="********"
//               />
//             </FormGroup>
//           </Col>
//           <Button>Submit</Button>
//         </Form>
//       </Container>
//     );
//   }
// }

// import React from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

// const CustomOrder = () => {
// return (
// <MDBContainer>
//   <MDBRow>
//     <MDBCol md="6">
//       <form>
//         <p className="h5 text-center mb-4">Write to us</p>
//         <div className="grey-text">
//           <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
//             success="right" />
//           <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
//             success="right" />
//           <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
//           <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
//         </div>
//         <div className="text-center">
//           <MDBBtn outline color="secondary">
//             Send
//             <MDBIcon far icon="paper-plane" className="ml-1" />
//           </MDBBtn>
//         </div>
//       </form>
//     </MDBCol>
//   </MDBRow>
// </MDBContainer>
// );
// };






// import React from 'react'
// import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
// import CustomOrderTitle from '../Images/CustomOrdersTitle.png';

// function CustomOrder() {
//     return (
//         <Container>
//             <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
//             <FormGroup id="custom-order-form" className="custom-text">
//                 <FormGroup>
//                     <Label for="exampleName"><h4>First and Last Name</h4></Label>
//                     <Input type="name" name="name" id="exampleName" placeholder="John Doe" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleEmail"><h4>Email</h4></Label>
//                     <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleText"><h4>Specific Instructions</h4></Label>
//                     <Input type="textarea" name="text" id="exampleText" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="quantity"><h4>uantity</h4></Label>
//                     <Input type="number" name="text" id="quantity" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleFile"><h4>Image</h4></Label>
//                     <Input type="file" name="file" id="exampleFile" />
//                     <FormText color="muted">
//                     Choose an image from your own computer to upload. This will be the image on your custom sticker!
//                     </FormText>
//                 </FormGroup>
//                 {/* <FormGroup tag="fieldset">
//                     <legend>Radio Buttons</legend>
//                     <FormGroup check>
//                     <Label check>
//                         <Input type="radio" name="radio1" />{' '}
//                         Option one is this and that—be sure to include why it's great
//                     </Label>
//                     </FormGroup>
//                     <FormGroup check>
//                     <Label check>
//                         <Input type="radio" name="radio1" />{' '}
//                         Option two can be something else and selecting it will deselect option one
//                     </Label>
//                     </FormGroup>
//                     <FormGroup check disabled>
//                     <Label check>
//                         <Input type="radio" name="radio1" disabled />{' '}
//                         Option three is disabled
//                     </Label>
//                     </FormGroup>
//                 </FormGroup> */}
//                 <FormGroup check>
//                     <Label check>
//                     <Input type="checkbox" />{' '}
//                     Check me out
//                     </Label>
//                 </FormGroup>
//                 <Button>Submit</Button>
//             </FormGroup>
//         </Container>
//     );
// }

// export default CustomOrder;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { Component } from 'react';
// import {
//   Container, Col, Form,
//   FormGroup, Label, Input,
//   Button,
// } from 'reactstrap';
// // import './App.css';

// class CustomOrder extends Component {
//   render() {
//     return (
//       <Container className="hasSuccess">
//         <h2>Sign In</h2>
//         <Form className="form">
//           <Col>
//             <FormGroup>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 id="exampleEmail"
//                 placeholder="myemail@email.com"
//               />
//             </FormGroup>
//           </Col>
//           <Col>
//             <FormGroup>
//               <Label for="examplePassword">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="examplePassword"
//                 placeholder="********"
//               />
//             </FormGroup>
//           </Col>
//           <Button>Submit</Button>
//         </Form>
//       </Container>
//     );
//   }
// }

// import React from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

// function CustomOrder() {
//     return (
//         <MDBContainer>
//             <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
//             <MDBContainer id="custom-order-form">
//                 <MDBRow>
//                     <MDBCol>
//                         <MDBInput label="First Name" icon="user" group type="text" validate error="wrong" success="right" />
//                     </MDBCol>
//                     <MDBCol>
//                         <MDBInput label="Last Name" icon="user" group type="text" validate error="wrong" success="right" />
//                     </MDBCol>
//                 </MDBRow>
//                 <MDBRow>
//                     <MDBInput label="Email Address" icon="envelope" group type="email" validate error="wrong" success="right" />
//                 </MDBRow>
//                 <MDBRow>
//                     <MDBCol md="6">
//                     <form>
//                         <p className="h5 text-center mb-4">Write to us</p>
//                         <div className="grey-text">
//                         <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
//                             success="right" />
//                         <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
//                             success="right" />
//                         <MDBInput label="Subject" icon="tag" group type="text" validate error="wrong" success="right" />
//                         <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
//                         </div>
//                         <div className="text-center">
//                         <MDBBtn outline color="secondary">
//                             Send
//                             <MDBIcon far icon="paper-plane" className="ml-1" />
//                         </MDBBtn>
//                         </div>
//                     </form>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </MDBContainer>
//     );
// };

// export default CustomOrder;

//         <Container>
//             <h1><img id="custom-orders-title" src={CustomOrderTitle} alt="Custom orders"></img></h1>
//             <FormGroup id="custom-order-form" className="custom-text">
//                 <FormGroup>
//                     <Label for="exampleName"><h4>First and Last Name</h4></Label>
//                     <Input type="name" name="name" id="exampleName" placeholder="John Doe" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleEmail"><h4>Email</h4></Label>
//                     <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleText"><h4>Specific Instructions</h4></Label>
//                     <Input type="textarea" name="text" id="exampleText" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="quantity"><h4>uantity</h4></Label>
//                     <Input type="number" name="text" id="quantity" />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="exampleFile"><h4>Image</h4></Label>
//                     <Input type="file" name="file" id="exampleFile" />
//                     <FormText color="muted">
//                     Choose an image from your own computer to upload. This will be the image on your custom sticker!
//                     </FormText>
//                 </FormGroup>
//                 {/* <FormGroup tag="fieldset">
//                     <legend>Radio Buttons</legend>
//                     <FormGroup check>
//                     <Label check>
//                         <Input type="radio" name="radio1" />{' '}
//                         Option one is this and that—be sure to include why it's great
//                     </Label>
//                     </FormGroup>
//                     <FormGroup check>
//                     <Label check>
//                         <Input type="radio" name="radio1" />{' '}
//                         Option two can be something else and selecting it will deselect option one
//                     </Label>
//                     </FormGroup>
//                     <FormGroup check disabled>
//                     <Label check>
//                         <Input type="radio" name="radio1" disabled />{' '}
//                         Option three is disabled
//                     </Label>
//                     </FormGroup>
//                 </FormGroup> */}
//                 <FormGroup check>
//                     <Label check>
//                     <Input type="checkbox" />{' '}
//                     Check me out
//                     </Label>
//                 </FormGroup>
//                 <Button>Submit</Button>
//             </FormGroup>
//         </Container>
//     );
// }

