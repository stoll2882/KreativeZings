const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const UserController = require("./controllers/UserController");
const UtilityController = require("./controllers/UtilityController");
const CartController = require("./controllers/CartController");
const OrderController = require('./controllers/OrderController');
const serverConfig = require('./config/serverconfig');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Need CORS header when server running on different port then client. 
if(serverConfig.ENVIRONMENT != "production") {
    console.log("Running locally in development mode. Adding CORS header");
    var corsOptions = {
        origin: "http://localhost:3000"
    };
    
    app.use(cors(corsOptions));      
}

UserController.setupRoutes(app);
CartController.setupRoutes(app);
OrderController.setupRoutes(app);
UtilityController.setupRoutes(app);

// Setup the routes to run 
if(serverConfig.ENVIRONMENT == "production") {
    console.log("Running in production mode. Adding static routes, resolution needed to serve react app directly");

    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} 

// set port, listen for requests
app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}.`);
});

