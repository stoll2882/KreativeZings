import React from 'react';
// import '../../styles.css';
import MainTitle from '.././Images/MainTitle.png';

function HomePage () {
    return (
        <React.Fragment>
            <h1><img id="main-title" src={MainTitle} alt="Kreative Zings"></img></h1>
            <h2 id="main-page-description">Stickers, Paintings, Custom Orders and More!</h2>
        </React.Fragment>
    );
};

export default HomePage;