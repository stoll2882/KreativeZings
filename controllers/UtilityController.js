const userStorage = require('./userStorage');
const serverConfig = require('../config/serverconfig');
const nodemailer = require('nodemailer');

function setupRoutes(app) {

    app.post("/contactMe", function (req, res) {

        var request = req.body;
        var name = request.name;
        var email = request.email;
        var reasonForContact = request.reasonForContact;
        var message = request.message;

        var mail = {
            from: serverConfig.EMAIL_USERNAME,
            to: serverConfig.EMAIL_USERNAME,
            subject: "New Message from Contact Form" + reasonForContact,
            text: "From: " + email + "\nMessage: " + message
        }

        var form = {
            name: name,
            email: email,
            reasonForContact: reasonForContact,
            message: message
        }

        var transporter = nodemailer.createTransport( {
            service: "Yahoo",
            // debug: true,
            // logger: true,
            auth: {
                user: serverConfig.EMAIL_USERNAME,
                pass: serverConfig.EMAIL_PASSWORD
            }
        });        

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
}

module.exports = { setupRoutes };