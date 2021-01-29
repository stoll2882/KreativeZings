import React, { useContext, useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button, CardColumns } from 'react-bootstrap';
import Sticker from "./Sticker";
import StickerTitle from "../Images/StickersTitle.png";
import CatalogService from '../services/CatalogService';

export default function Stickers() {

    const [catalogItems, setCatalogItems] = useState([]);

    function loadCatalog() {
        CatalogService.getAllProducts().then((x) => setCatalogItems(x));
    }

    useEffect(loadCatalog, []);

    return (
        <div>
            <h1><img id="stickers-title" src={StickerTitle} alt="Stickers"></img></h1>
            <CardColumns className="custom-text" id="stickers-container">
                { catalogItems.map( (x) => <Sticker key={x.id} id={x.id} name={x.name} description={x.description} image={x.image} quantity={x.quantity} />)};
            </CardColumns>
        </div>
    );
};
