const mongoClient = require("mongodb").MongoClient; 
var sanitize = require("mongo-sanitize");
let Validator = require("validatorjs");

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
        var cleanUserName = sanitize(userName);
        this.database.collection("user").findOne({userName: cleanUserName}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    createAccountRules = {
        firstName: 'required|alpha',
        lastName: 'required|alpha',
        userName: 'required|alpha_num|min:4',
        password: 'required|string|min:8',
        email: 'required|email'
    }
    createUser(user, callWhenDone) {
        let validation = new Validator(user, this.createAccountRules);
        if (validation.passes()) {
            this.database.collection("user").insertOne(user, function(err, res) {
                console.log("user item inserted");
                callWhenDone(null);
            });
        } else {
            callWhenDone(validation.errors.all());
        }
    }

    getCart(userName, callWhenDone) {
        var cleanUserName = sanitize(userName);
        this.database.collection("cart").findOne({_id: cleanUserName}, function(err, result) {
            console.log(result);
            if (result == null) {
                callWhenDone(null);
            } else {
                callWhenDone(result.items);
            }
        });
    }

    getOrdersByUserName(userName, callWhenDone) {
        var cleanUserName = sanitize(userName);
        this.database.collection("orderPayments").find({userName: cleanUserName}).toArray(function(err, result) {
            console.log(result);
            if (err == null) {
                callWhenDone(result);
            } else {
                callWhenDone([]);
            }
        })
    }

    contactMeRules = {
        name: 'required|string|min:3',
        email: 'required|email',
        message: 'required|string|min:5'
    }
    contactMeRequest(form, callWhenDone) {
        let validation = new Validator(form, this.contactMeRules);
        console.log(JSON.stringify(form));
        if (validation.passes()) {
            this.database.collection("contactMeForms").insertOne(form, function(err, res) {
                console.log("custom order item inserted");
                callWhenDone(null);
            });
        } else {
            callWhenDone(validation.errors.all())
        }
    }

    updateCartRules = {
        _id: 'required',
        items: "array"
    }
    updateCart(userName, cart, callWhenDone) {
        var cartWrapper = { 
            _id: userName,
            items: cart
        }
        let validation = new Validator(cartWrapper, this.updateCartRules);
        console.log("writing cart for user " + userName + " cart is: " + JSON.stringify(cart));
        if (validation.passes()) {
            this.getCart(userName, (currentCart) => {
                if (currentCart == undefined || currentCart == null) {
                    this.database.collection("cart").insertOne(cartWrapper, function(err, res) {
                        console.log("no cart found, writing new one, err = " + err);
                        callWhenDone(null);
                    });
                } else {
                    var cartUpdates = { $set: cartWrapper };
                    this.database.collection("cart").updateOne({_id: userName}, cartUpdates, function(err, res) {
                        console.log("updating cart");
                        callWhenDone(validation.errors.all());
                    });
                }
            });
        } else {
            callWhenDone(validation.errors.all());
        }
    }

    getCustomOrderByID(_id, callWhenDone) {
        var cleanID = sanitize(_id);
        this.database.collection("customOrders").findOne({_id: cleanID}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    customOrderRules = {
        name: 'required',
        email: 'required|email',
        quantity: 'required|integer|min:1',
        image: 'required',
        specificInstructions: 'required'
    }
    createCustomOrder(customOrder, callWhenDone) {
        customOrder._id = customOrder.email;
        console.log("quantity: " + customOrder.quantity);
        let validation = new Validator(customOrder, this.customOrderRules);
        if (validation.passes()) {
            this.database.collection("customOrders").insertOne(customOrder, function(err, res) {
                console.log("custom order item inserted");
                callWhenDone(null);
            });
        } else {
            callWhenDone(validation.errors.all())
        }
    }

    getOrderPaymentByID(_id, callWhenDone) {
        var cleanID = sanitize(_id);
        this.database.collection("orderPayments").findOne({_id: cleanID}, function(err, result) {
            console.log(result);
            callWhenDone(result);
        });
    }

    orderPaymentRules = {
        name: 'required',
        email: 'required',
        userName: 'required',
        address: 'required|string|min:19',
        creditCardInfo: {
            number: 'required|numeric',
            expiry: 'required|date',
            cvc: 'required|digits:3'
        }
    }

    createOrderPayment(order, callWhenDone) {
        let validation = new Validator(order, this.orderPaymentRules);
        console.log(order.address);
        if (validation.passes()) {
            this.database.collection("orderPayments").insertOne(order, function(err, res) {
                console.log(JSON.stringify(order));
                console.log("order payment item inserted");
                callWhenDone(null);
            });
        } else {
            callWhenDone(validation.errors.all());
        }
    }
};

module.exports = userStorage;