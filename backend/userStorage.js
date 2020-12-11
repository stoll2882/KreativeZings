const mongoClient = require("mongodb").MongoClient; 

class userStorage {

    database = null;

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

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
            console.log("user item inserted");
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

    getOrdersByUserName(userName, callWhenDone) {
        this.database.collection("orderPayments").find({userName: userName}).toArray(function(err, result) {
            console.log(result);
            if (err == null) {
                callWhenDone(result);
            } else {
                callWhenDone([]);
            }
        })
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

    getCustomOrderByID(_id, callWhenDone) {
        this.database.collection("customOrders").findOne({_id: _id}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    createCustomOrder(customOrder, callWhenDone) {
        customOrder._id = customOrder.email;
        this.database.collection("customOrders").insertOne(customOrder, function(err, res) {
            console.log("custom order item inserted");
            callWhenDone();
        });
    }

    getOrderPaymentByID(_id, callWhenDone) {
        this.database.collection("orderPayments").findOne({_id: _id}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    createOrderPayment(order, callWhenDone) {
        this.database.collection("orderPayments").insertOne(order, function(err, res) {
            console.log(JSON.stringify(order));
            console.log("order payment item inserted");
            callWhenDone();
        });
    }
};

module.exports = userStorage;