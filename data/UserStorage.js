const User = require('../models/User');
const Config = require('../config/serverconfig');
const mongoClient = require("mongodb").MongoClient; 

class UserStorage {

    static USER_DB_NAME = "mydb";
    static USER_COLLECTION_NAME = "UsersNew"

    async init() {
        try {
            var client = await mongoClient.connect(Config.DB_URL);
            this.db = client.db(UserStorage.USER_DB_NAME);
        } catch(error) {
            const errorMessage = "USERSTORAGE(init): Failed to open connection to the mongo database. Error="+error;
            throw errorMessage;
        }
    }

    async addUser(user) {
        try {
            await this.db.collection(UserStorage.USER_COLLECTION_NAME).insertOne(user);
            console.log("USERSTORAGE(addUser): New user added. Username="+user.userName);
        } catch(error) {
            const errorMessage = "USERSTORAGE(addUser): Failed to write new user. Error="+error;
            throw errorMessage;
        }      
    }

    async getByUserName(userName) {
        try {
            const user = await this.db.collection(UserStorage.USER_COLLECTION_NAME).findOne({userName: userName});
            if (user == null) {
                console.log("USERSTORAGE(getUserByUserName): Could not find user. Username="+userName);
                return null;
            } else {
                console.log("USERSTORAGE(getUserByUserName): Found user. Username="+user.userName);
                return user;
            }
        } catch(error) {
            console.log("USERSTORAGE(getUserByUserName) Could not find user by username. Username="+userName+" Error="+error);
            return null;
        }
    }    

    close() {
        this.db.close();
    }
}

module.exports = UserStorage;

