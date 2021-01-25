const userStorage = require('./userStorage');

function setupRoutes(app) {

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
}

module.exports = { setupRoutes };