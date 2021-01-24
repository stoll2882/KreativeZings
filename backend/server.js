const express = require("express");
const mongoClient = require("mongodb").MongoClient; 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userStorage = require("./userStorage");
const User = require("./user.js");
var nodemailer = require('nodemailer');
const creds = require('./config');
const multer = require('multer');
const passwords = require("./passwords");
const process = require("process")

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

app.post("/user", function (req, res) {
    var storageUser = new userStorage();
    var user = req.body;
    storageUser.initialize( () => {
        storageUser.createUser(user, (errors) => {
            if (errors == null) {
                res.status(201).end();
            } else {
                res.send(errors).status(400).end();
            }
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


app.get("/user/:userName/", function (req, res) {
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.getUserByUserName(req.params["userName"], (user) => {
            // if (err) throw err;
            if (user != null) {
                res.send(user).status(200).end();
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
    // debug: true,
    // logger: true,
    auth: {
        user: process.env.EMAIL_USERNAME || passwords.email,
        pass: process.env.EMAIL_PASSWORD || passwords.password
    }
});

app.post("/contactMe", function (req, res) {

    var request = req.body;
    var name = request.name;
    var email = request.email;
    var reasonForContact = request.reasonForContact;
    var message = request.message;

    var mail = {
        from: passwords.email,
        to: passwords.email,
        subject: "New Message from Contact Form" + reasonForContact,
        text: "From: " + email + "\nMessage: " + message
    }

    var form = {
        name: name,
        email: email,
        reasonForContact: reasonForContact,
        message: message
    }

    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.contactMeRequest(form, (errors) => {
            if (errors == null) {
                res.status(200).end();
                console.log(JSON.stringify(form));
                console.log("contactme inserted");
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
            } else {
                console.log("returning 400...");
                res.status(400).send(errors).end();
            }
        });
    });
});

const upload = multer({});

app.post("/customOrderRequest/:name/:email/:specificInstruction/:quantity", upload.single('image'), function (req, res) {
    var name = req.params["name"];
    var email = req.params["email"];
    var specificInstructions = req.params["specificInstruction"];
    var quantity = req.params["quantity"];
    var image = req.file;

    var customOrder = {
        name: name,
        email: email,
        specificInstructions: specificInstructions,
        quantity: quantity,
        image: image.buffer
    }

    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.createCustomOrder(customOrder, (errors) => {
            if (errors == null) {
                res.status(200).end();
                console.log(JSON.stringify(customOrder));
                console.log("item inserted");

                var mail = {
                    from: passwords.email,
                    to: passwords.email,
                    subject: "New Custom Order",
                    text: "From: " + name + "\nEmail: " + email + "\n\nSpecific Instructions: " + specificInstructions + "\nQuantity: " + quantity + "\n",
                    attachments: [
                        { filename: "image.jpeg", content: image.buffer, contentType: "image/jpeg" }
                    ]
                }
            
                transporter.sendMail(mail, (err, data) => {
                    if (err) {
                        console.log("failed to send email. Error: " + err);
                        res.json({
                          status: 'fail'
                        })
                    } else {
                        console.log("sent email: " + data.response);
                        console.log("envelope: " + JSON.stringify(data.envelope));
                        res.json({
                         status: 'success'
                        });
                    }
                });
            } else {
                res.status(400).send(errors).end();
            }
        });
    });
});

// function to get and return the cart by finding the one under the users username
app.get("/customOrderRequest/:_id", function (req, res) {
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.getCustomOrderByID(req.params["_id"], (order) => {
            if (order != null) {
                res.send(order).status(200).end();
            } else {
                res.status(404).end();
            }
        });
    });
});

app.post("/orderPayment/", function (req, res) {
    var order = req.body;
    var userName = order.userName;
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.createOrderPayment(order, (errors) => {
            if (errors == null) {
                res.status(200).end();
                console.log(JSON.stringify(order));
                console.log("orderPayment inserted");
            } else {
                console.log("returning 400...");
                res.status(400).send(errors).end();
            }
        });
    });
});

app.get("/orderPayment/:userName", function (req, res) {
    var storageUser = new userStorage();
    storageUser.initialize( () => {
        storageUser.getOrdersByUserName(req.params["userName"], (orders) => {
            if (orders != null) {
                res.send({orderArray: orders}).status(200).end();
            } else {
                res.status(404).end();
            }
        });
    });
});

app.use(express.json());
