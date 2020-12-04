const express = require("express");
const mongoClient = require("mongodb").MongoClient; 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const db = require("./models");
const userStorage = require("./userStorage");
const User = require("./user.js");
const api = require("./image.routes");
var nodemailer = require('nodemailer');
const creds = require('./config');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// var databse = null;

// mongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
//     if (err) {
//         throw err;
//     }
//     console.log("database created");
//     databse = db.db("mydb");
// });

// app.post("/user:/firstName:/lastName:/userName:/password:/email:/phoneNumber", function (req, res) {
//     var storageUser = new userStorage();
//     var user = new User(req.params["userName"], req.params["firstName"], req.params["lastName"], req.params["password"], req.params["email"], req.params["phoneNumber"]);
//     storageUser.initialize( () => {
//         storageUser.createUser(user, () => {
//             res.status(201).end();
//         });
//     });
// });

app.post("/user", function (req, res) {
    var storageUser = new userStorage();
    var user = req.body;
    storageUser.initialize( () => {
        storageUser.createUser(user, () => {
            res.status(201).end();
        });
    });
});

app.get("/user/:userName/:password", function (req, res) {
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.getUserByUserName(req.params["userName"], (user) => {
            // if (err) throw err;
            if (user != null) {
                if (req.params["password"] == user.password) {
                    res.send(user).status(200).end();
                } else {
                    res.status(401).end(); // 401 means unauthorized
                }
            } else {
                res.status(404).end();
            }
        });
    });
});

// function to update the cart by passing in the new updated cart and setting it in the database
app.post("/cart/:userName", function (req, res) {
    var storageUser = new userStorage();
    var cart = req.body;
    console.log("cart is: " + JSON.stringify(cart));
    storageUser.initialize( () => {
        storageUser.updateCart(req.params["userName"], cart, () => {
            res.status(200).end();
        });
    });
});

// function to get and return the cart by finding the one under the users username
app.get("/cart/:userName", function (req, res) {
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.getCart(req.params["userName"], (cart) => {
            if (cart != null) {
                res.send(cart).status(200).end();
            } else {
                res.status(404).end();
            }
        });
    });
});

var transporter = nodemailer.createTransport( {
    service: "Yahoo",
    auth: {
        user: "stoll2882@yahoo.com",
        pass: "loeqjujoktmtjafc"
    }
});

app.post("/contactMe", function (req, res) {
    var request = req.body;
    var name = request.name;
    var email = request.email;
    var reasonForContact = request.reasonForContact;
    var message = request.message;

    var mail = {
        from: "stoll2882@yahoo.com",
        to: "stoll2882@yahoo.com",
        subject: "New Message from Contact Form" + reasonForContact,
        text: "22From: " + email + "\nMessage: " + message
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log("failed to send email. Error: " + err);
            res.json({
              status: 'fail'
            })
        } else {
            console.log("sent email: " + data.response);
            res.json({
             status: 'success'
            });
        }
    });
});

app.post("/customOrderRequest", function (req, res) {
    var request = req.body;
    var name = request.name;
    var email = request.email;
    var specificInstructions = request.specificInstructions;
    var quantity = request.quantity;
    var image = request.image;

    var mail = {
        from: "stoll2882@yahoo.com",
        to: "stoll2882@yahoo.com",
        subject: "New Message from Contact Form" + reasonForContact,
        text: "From: " + name + "\nEmail: " + email + "\n\nSpecific Instructions: " + specificInstructions,
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log("failed to send email. Error: " + err);
            res.json({
              status: 'fail'
            })
        } else {
            console.log("sent email: " + data.response);
            res.json({
             status: 'success'
            });
        }
    });
});

app.use(express.json());
