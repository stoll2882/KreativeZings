const userStorage = require('./userStorage');

function setupRoutes(app) {
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
}

module.exports = { setupRoutes };
