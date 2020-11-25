import React, {useContext} from 'react';
import Context from '../store/context';
import Table from 'react-bootstrap/Table';
import PricesTitle from '../Images/PricesTitle.png';
import "bootstrap/dist/css/bootstrap.css";

function Prices () {
    const {state} = useContext(Context);
    return (
        <div>
            <h1><img id="prices-title" src={PricesTitle} alt="Prices"></img></h1>
            <Table striped bordered hover variant="none" id="prices-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Pre-Designed Sticker</td>
                        <td>Small: $3.00</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                        <td>Medium: $6.00</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                        <td>Large: $10.00</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Custom Image Sticker</td>
                        <td>Small: $6.00</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td></td>
                        <td>Medium: $8.00</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td></td>
                        <td>Large: $13.00</td>
                    </tr>
                </thead>
            </Table>
        </div>
    );
}

export default Prices;