const userStorage = require('./userStorage');
const User = require('../models/User');
const UserService = require('../services/UserService');
const sanitize = require("mongo-sanitize");

function setupRoutes(app) {

    app.post("/user", async function (req, res) {
        var newUser = User.fromJSON(req.body);  

        try {
            const userService = new UserService();
            await userService.init();
            userService.createUser(newUser);
            userService.close();
            res.send.status(201).end();
        } catch(error) {
            console.log("USERCONTROLLER(postuser): Create failed with error="+error);
            res.send.status(400).end();
        }
    });

    app.get("/user/:userName/:password", async function (req, res) {
        try {
            var userName = sanitize(req.params["userName"]);
            var password = sanitize(req.params["password"]);

            const userService = new UserService();
            await userService.init();
            var user = await userService.authedGetUser(userName, password);
            if(user != null) {
                console.log("USERCONTROLLER(getUserAuth): Retrieved user after succesful auth. Username="+userName);
                res.send(user).status(200).end();
            } else {
                console.log("USERCONTROLLER(getUserAuth): Failed authentication. Username="+userName);
                res.status(401).end();
            }
        } catch(error) {
            console.log("USERCONTROLLER(getUserAuth): Get user for auth failed with error="+error);
            res.status(500).end();
        }
    });

    app.get("/user/:userName/", async function (req, res) {

        try {
            var userName = sanitize(req.params["userName"]);
            const userService = new UserService();
            await userService.init();
            var user = await userService.getUserByUserName(userName);
            if(user == null) {
                console.log("USERCONTROLLER(getUser): Get user failed. Username="+userName);
                res.status(404).end();                    
            } else {
                console.log("USERCONTROLLER(getUser): Retrieved user after succesful auth. Username="+userName);
                res.send(user).status(200).end();
            }
        } catch(error) {
            console.log("USERCONTROLLER(getUser): Get user failed with error="+error);
            res.status(500).end();
        }
    });

    app.get("/user/checkName/:userName", async function (req, res) {
        try {
            var userName = sanitize(req.params["userName"]);
            const userService = new UserService();
            await userService.init();
            var user = await userService.getUserByUserName(userName);
            if(user == null) {
                console.log("USERCONTROLLER(checkName): Get user failed. Username="+userName);
                res.status(404).end();                    
            } else {
                console.log("USERCONTROLLER(checkName): Retrieved user after succesful auth. Username="+userName);
                res.status(200).end();
            }
        } catch(error) {
            console.log("USERCONTROLLER(checkName): Get user failed with error="+error);
            res.status(500).end();
        }        
    });
}

module.exports = { setupRoutes };