const nodemailer = require('nodemailer');
const multer = require('multer');
const serverConfig = require('../config/serverconfig');
const upload = multer({});
const express = require("express");
const userStorage = require('./userStorage');

var transporter = nodemailer.createTransport( {
    service: "Yahoo",
    auth: {
        user: serverConfig.EMAIL_USERNAME,
        pass: serverConfig.EMAIL_PASSWORD
    }
});

function setupRoutes(app) {
    app.use("/uploads", express.static("uploads"));

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
                        from: serverConfig.EMAIL_USERNAME,
                        to: serverConfig.EMAIL_USERNAME,
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
}  

module.exports = { setupRoutes };