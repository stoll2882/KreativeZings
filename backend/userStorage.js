const mongoClient = require("mongodb").MongoClient; 

class userStorage {

    database = null;

    initialize(callWhenDone) {
        var self = this;
        mongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
            if (err) {
                throw err;
            }
            console.log("database created");
            self.database = db.db("mydb");
            callWhenDone();
        });
    }

    getUserByUserName(userName, callWhenDone) {
        this.database.collection("user").findOne({userName: userName}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    createUser(user, callWhenDone) {
        this.database.collection("user").insertOne(user, function(err, res) {
            console.log("item inserted");
            callWhenDone();
        });
    }

    getCart(userName, callWhenDone) {
        this.database.collection("cart").findOne({_id: userName}, function(err, result) {
            console.log(result);
            if (result == null) {
                callWhenDone(null);
            } else {
                callWhenDone(result.items);
            }
        });
    }

    updateCart(userName, cart, callWhenDone) {
        var cartWrapper = { 
            _id: userName,
            items: cart
        }
        console.log("writing cart for user " + userName + " cart is: " + JSON.stringify(cart));
        this.getCart(userName, (currentCart) => {
            if (currentCart == undefined || currentCart == null) {
                this.database.collection("cart").insertOne(cartWrapper, function(err, res) {
                    console.log("no cart found, writing new one, err = " + err);
                    callWhenDone();
                });
            } else {
                var cartUpdates = { $set: cartWrapper };
                this.database.collection("cart").updateOne({_id: userName}, cartUpdates, function(err, res) {
                    console.log("updating cart");
                    callWhenDone();
                });
            }
        });
    }
};

module.exports = userStorage;