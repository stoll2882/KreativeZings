import React, { useContext } from 'react'
import { Container, Card, Row, Col, Button, CardColumns } from 'react-bootstrap';
import Sticker from "./Sticker";
import StickerTitle from "../Images/StickersTitle.png";
import Sticker1 from '../Images/StickerImages/PaperThin.png'
import Sticker2 from '../Images/StickerImages/BelieveYouCan.png'
import Sticker3 from '../Images/StickerImages/HumanKind.png'
import Sticker4 from '../Images/StickerImages/CuteButCrazy.png'
import Sticker5 from '../Images/StickerImages/Devil.png'
import Sticker6 from '../Images/StickerImages/EnjoyToday.png'
import Sticker7 from '../Images/StickerImages/Freedom.png'
import Sticker8 from '../Images/StickerImages/BeSmile.png'
import Sticker9 from '../Images/StickerImages/Meh.png'
import Sticker10 from '../Images/StickerImages/Mindset.png'
import Sticker11 from '../Images/StickerImages/NeverGiveUp.png'
import Sticker12 from '../Images/StickerImages/Olaf.png'
import Sticker13 from '../Images/StickerImages/OnlyHuman.png'
import Sticker14 from '../Images/StickerImages/PainIsStrong.png'
import Sticker15 from '../Images/StickerImages/SmileBright.png'
import Sticker16 from '../Images/StickerImages/StandOut.png'
import Sticker17 from '../Images/StickerImages/Sunshine.png'
import Sticker18 from '../Images/StickerImages/TheBest.png'
import render from 'react-dom';
import UserContext from '../store/context';

export default class Stickers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cartItems: []};
    }

    render() {

        const stickerArray = [
            { id: 1, name: "Paper Thin Sticker", description: "Black and white Paper Thin sticker popular and ready for purchase!", image: Sticker1, quantity: 1},
            { id: 2, name: "Believe You Can Sticker", description: "Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.", image: Sticker2, quantity: 1 },
            { id: 3, name: "Human Kind Sticker", description: "Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)", image: Sticker3, quantity: 1 },
            { id: 4, name: "Cute But Crazy Sticker", description: "Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process.", image: Sticker4, quantity: 1 },
            { id: 5, name: "Devil / Angel Sticker", description: "Devil sticker with Angel intertwined to remind us all that we all have dark sides.", image: Sticker5, quantity: 1 },
            { id: 6, name: "Enjoy Today Sticker", description: "Sticker labeled Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted.", image: Sticker6, quantity: 1 },
            { id: 7, name: "Freedom Sticker", description: "Sticker with beautiful butterflys and the label Freedom. Inspired by my best friend who never fails to remind me I need to let go and fly sometimes!", image: Sticker7, quantity: 1 },
            { id: 8, name: "You Smile Sticker", description: "Created this sticker labeled Be With Someone Who Makes You Smile to remind us we all all worthy of happiness so make sure you don't let anyone take that away from you!", image: Sticker8, quantity: 1 },
            { id: 9, name: "Meh Sticker", description: "We all have those days... Meh", image: Sticker9, quantity: 1 },
            { id: 10, name: "Mindset Sticker", description: "Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. Reminder to always stay positive because you never know whats on the other side!", image: Sticker10, quantity: 1 },
            { id: 11, name: "Never Give Up Sticker", description: "Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind myself and others to never stop fighting!!!", image: Sticker11, quantity: 1 },
            { id: 12, name: "Olaf Sticker", description: "Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES that quote.", image: Sticker12, quantity: 1 },
            { id: 13, name: "Only Human Sticker", description: "Mandala sticker that says Only Human to remind us all we are in fact only human and cannot do it all!", image: Sticker13, quantity: 1 },
            { id: 14, name: "Pain Is Strong Sticker", description: "Sticker depicting the quote: Pain is strong you are stronger. Reminder there is nothing you cannot overcome.", image: Sticker14, quantity: 1 },
            { id: 15, name: "Smile Bright Sticker", description: "Sticker to remind you to smile! Because it makes the world a better place with more smiles :)", image: Sticker15, quantity: 1 },
            { id: 16, name: "Stand Out Sticker", description: "Sticker inspired by our own originality. You were born to stand out, just be your beautiful self.", image: Sticker16, quantity: 1 },
            { id: 17, name: " You Are My Sunshine Sticker", description: "Sticker inspired by all the moms out there that sang this for years: You are my sunshine...", image: Sticker17, quantity: 1 },
            { id: 18, name: "The Best Is Yet To Come Sticker", description: "The best is yet to come! Just keep on going and good things will come :)", image: Sticker18, quantity: 1 },
        ];

        this.stickerCards = stickerArray.map( (sticker) => {
            return (
                <Sticker id={sticker.id} name={sticker.name} description={sticker.description} image={sticker.image} quantity={sticker.quantity} addToCart={this.handleAddToCart} />
            );
        });

        return (
            <div>
                <h1><img id="stickers-title" src={StickerTitle} alt="Stickers"></img></h1>
                <CardColumns className="custom-text" id="stickers-container">
                    {this.stickerCards}
                </CardColumns>
            </div>
        );
    }
};

            // <div>
            //     {this.stickerArray.map()}
            // </div>

            // <Container className="custom-text" id='stickers-container'>
            //     <Row><h1>Kreative Zings Stickers:</h1></Row>
            //     <br></br>
            //     <br></br>
            //     <Row>
            //         <Col>
            //             <Sticker id={1} name={"Paper Thin Sticker"} description={"Black and white Paper Thin sticker popular and ready for purchase!"} image={Sticker1} />
            //         </Col>
            //         <Col>
            //             <Sticker id={2} name={"Believe You Can Sticker"} description={"Sticker to remind us all to Believe We Can accomplish whatever we put our minds to."} image={Sticker2} />
            //         </Col>
            //         <Col>
            //             <Sticker id={3} name={"Human Kind Sticker"} description={"Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)"} image={Sticker3} />
            //         </Col>
            //     </Row>
            //     <br></br>
            //     <br></br>
            //     <Row>
            //         <Col>
            //             <Sticker id={4} name={"Cute But Crazy Sticker"} description={"Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process."} image={Sticker4} />
            //         </Col>
            //         <Col>
            //             <Sticker id={5} name={"Devil / Angel Sticker"} description={"Devil sticker with Angel intertwined to remind us all that we all have dark sides."} image={Sticker5} />
            //         </Col>
            //         <Col>
            //             <Sticker id={6} name={"Enjoy Today Sticker"} description={"Sticker labled with Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted/"} image={Sticker6} />
            //         </Col>
            //     </Row>
            //     <br></br>
            //     <br></br>
            //     <Row>
            //         <Col>
            //             <Sticker id={7} name={"Freedom Sticker"} description={"Sticker with beautiful butterflys and the label Freedom. Inspired by my best friend who never fails to remind me I need to let go and fly sometimes!"} image={Sticker7} />
            //         </Col>
            //         <Col>
            //             <Sticker id={8} name={"You Smile Sticker"} description={"Created this sticker labeled Be With Someone Who Makes You Smile to remind us we all all worthy of happiness so make sure you don't let anyone take that away from you!"} image={Sticker8} />
            //         </Col>
            //         <Col>
            //             <Sticker id={9} name={"Meh Sticker"} description={"We all have those days... Meh"} image={Sticker9} />
            //         </Col>
            //     </Row>
            //     <br></br>
            //     <br></br>
            //     <Row>
            //         <Col>
            //             <Sticker id={10} name={"Mindset Sticker"} description={"Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. Reminder to always stay positive because you never know whats on the other side!"} image={Sticker10} />
            //         </Col>
            //         <Col>
            //             <Sticker id={11} name={"Never Give Up Sticker"} description={"Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind myself and others to never stop fighting!!!"} image={Sticker11} />
            //         </Col>
            //         <Col>
            //             <Sticker id={12} name={"Olaf Sticker"} description={"Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES that quote."} image={Sticker12} />
            //         </Col>
            //     </Row>
            //     <br></br>
            //     <br></br>

            // </Container>




            // <Sticker id={1} name={"Paper Thin Sticker"} description={"Black and white Paper Thin sticker popular and ready for purchase!"} image={Sticker1} />,
            // (new Sticker(2, "Believe You Can Sticker", "Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.", Sticker2)),
            // (new Sticker(3, "Human Kind Sticker", "Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)", Sticker3)),
            // (new Sticker(4, "Cute But Crazy Sticker", "Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process.", Sticker4)),
            // (new Sticker(5, "Devil / Angel Sticker", "Devil sticker with Angel intertwined to remind us all that we all have dark sides.", Sticker5)),
            // (new Sticker(6, "Enjoy Today Sticker", "Sticker labeled Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted.", Sticker6)),
            // (new Sticker(7, "Freedom Sticker", "Sticker with beautiful butterflys and the label Freedom. Inspired by my best friend who never fails to remind me I need to let go and fly sometimes!", Sticker7)),
            // (new Sticker(8, "You Smile Sticker", "Created this sticker labeled Be With Someone Who Makes You Smile to remind us we all all worthy of happiness so make sure you don't let anyone take that away from you!", Sticker8)),
            // (new Sticker(9, "Meh Sticker", "We all have those days... Meh", Sticker9)),
            // (new Sticker(10, "Mindset Sticker", "Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. Reminder to always stay positive because you never know whats on the other side!", Sticker10)),
            // (new Sticker(11, "Never Give Up Sticker", "Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind myself and others to never stop fighting!!!", Sticker11)),
            // (new Sticker(12, "Olaf Sticker", "Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES that quote.", Sticker12))

// export default class Stickers extends React.Component {

//     Sticker = (id, name, description, image) => {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.image = image;
//     };

//     render() {

//         const stickerArray = [
//             // [
//             //     <Sticker id={1} name={"Paper Thin Sticker"} description={"Black and white Paper Thin sticker popular and ready for purchase!"} image={Sticker1} />,
//             //     <Sticker id={1} name={"Believe You Can Sticker"} description={"Sticker to remind us all to Believe We Can accomplish whatever we put our minds to."} image={Sticker1} />,
//             //     <Sticker id={1} name={"Human Kind Sticker"} description={"Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)"} image={Sticker1} />,
//             // ],
//             // [
//             //     <Sticker id={1} name={"Cute But Crazy Sticker"} description={"Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process."} image={Sticker1} />,
//             //     <Sticker id={1} name={"Devil / Angel Sticker"} description={"Devil sticker with Angel intertwined to remind us all that we all have dark sides."} image={Sticker1} />,
//             //     <Sticker id={1} name={"Enjoy Today Sticker"} description={"Sticker labeled Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted."} image={Sticker1} />
//             // ]
//             (new this.Sticker(2, "Believe You Can Sticker", "Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.", Sticker2)),
//             (new this.Sticker(3, "Human Kind Sticker", "Human Kind - Be Both. A sticker to remind us to accept everyones flaws and be kind to eachother no matter what :)", Sticker3)),
//             (new this.Sticker(4, "Cute But Crazy Sticker", "Sticker inspired by my younger sister, who never fails to drive me Crazy but also NEVER fails to be absolutely adorable in the process.", Sticker4)),
//             (new this.Sticker(5, "Devil / Angel Sticker", "Devil sticker with Angel intertwined to remind us all that we all have dark sides.", Sticker5)),
//             (new this.Sticker(6, "Enjoy Today Sticker", "Sticker labeled Enjoy Today to remind us all to live every day as if it were your last and not take any minutes for granted.", Sticker6)),
//             (new this.Sticker(7, "Freedom Sticker", "Sticker with beautiful butterflys and the label Freedom. Inspired by my best friend who never fails to remind me I need to let go and fly sometimes!", Sticker7)),
//             (new this.Sticker(8, "You Smile Sticker", "Created this sticker labeled Be With Someone Who Makes You Smile to remind us we all all worthy of happiness so make sure you don't let anyone take that away from you!", Sticker8)),
//             (new this.Sticker(9, "Meh Sticker", "We all have those days... Meh", Sticker9)),
//             (new this.Sticker(10, "Mindset Sticker", "Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. Reminder to always stay positive because you never know whats on the other side!", Sticker10)),
//             (new this.Sticker(11, "Never Give Up Sticker", "Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind myself and others to never stop fighting!!!", Sticker11)),
//             (new this.Sticker(12, "Olaf Sticker", "Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES that quote.", Sticker12))
//         ];

//         // this.stickerArray.array.forEach(element => {
            
//         // });

//         return (
//             <Container className="custom-text" id='stickers-container'>
//                 {this.stickerArray.map(newSticker => (
//                     <Card style={{ width: '20rem' }}>
//                         <Card.Img variant="top" src={Sticker2} />
//                         <Card.Body>
//                             <Card.Title><h3>Believe You Can Sticker</h3></Card.Title>
//                             <Card.Text>
//                             Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.
//                             </Card.Text>
//                             <Button variant="primary">Add To Cart</Button>
//                         </Card.Body>
//                     </Card>
//                 ))}
//             </Container>

//             // <Container className="custom-text" id='stickers-container'>
//             //     <Row><h1>Kreative Zings Stickers:</h1></Row>
//             //     <br></br>
//             //     <br></br>
//             //     <Row>
//             //         <Col>
                        
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker2} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Believe You Can Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker to remind us all to Believe We Can accomplish whatever we put our minds to.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker3} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Human Kind Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Human Kind - Be Both. A sticker to remind us to accept everyones flaws and
//             //                     be kind to eachother no matter what :)
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //     </Row>
//             //     <br></br>
//             //     <br></br>
//             //     <Row>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker4} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Cute But Crazy Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker inspired by my younger sister, who never fails to drive me Crazy
//             //                     but also NEVER fails to be absolutely adorable in the process.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker5} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Devil / Angel Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Devil sticker with Angel intertwined to remind us all that we all
//             //                     have dark sides.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker6} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Enjoy Today Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker labeled Enjoy Today to remind us all to live every day as if it 
//             //                     were your last and not take any minutes for granted.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //     </Row>
//             //     <br></br>
//             //     <br></br>
//             //     <Row>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker7} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Freedom Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker with beautiful butterflys and the label Freedom. Inspired by my
//             //                     best friend who never fails to remind me I need to let go and fly sometimes!
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker8} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>You Smile Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Created this sticker labeled Be With Someone Who Makes You Smile to remind us
//             //                     we all all worthy of happiness so make sure you don't let anyone take that
//             //                     away from you!
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker9} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Meh Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     We all have those days... Meh.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //     </Row>
//             //     <br></br>
//             //     <br></br>
//             //     <Row>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker10} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Mindset Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker meant to inspire with the saying Your Life is as Good as Your Mindset. 
//             //                     Reminder to always stay positive because you never know whats on the other side!
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker11} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Never Give Up Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Sticker inspired by some of my hardest times, labeled Never Give Up. Meant to remind
//             //                     myself and others to never stop fighting!!!
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //         <Col>
//             //             <Card style={{ width: '20rem' }}>
//             //                 <Card.Img variant="top" src={Sticker12} />
//             //                 <Card.Body>
//             //                     <Card.Title><h3>Olaf Sticker</h3></Card.Title>
//             //                     <Card.Text>
//             //                     Olaf sticker saying Some People Are Worth Melting For. Inspired by my best friend who LOVES
//             //                     that quote.
//             //                     </Card.Text>
//             //                     <Button variant="primary">Add To Cart</Button>
//             //                 </Card.Body>
//             //             </Card>
//             //         </Col>
//             //     </Row>
//             //     <br></br>
//             //     <br></br>

//             // </Container>
//         );
//     }
// };

// export default Stickers;