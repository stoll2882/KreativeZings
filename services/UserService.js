const UserStorage = require('../data/UserStorage');

class UserService {
    constructor() {
    }

    async init() {
        this.userStorage = new UserStorage();
        await this.userStorage.init(); 
    }

    async createUser(user) {
        await this.userStorage.addUser(user);
    }

    async getUserByUserName(userName) {
        return await this.userStorage.getByUserName(userName);
    }

    async authedGetUser(userName, password) { 
        const user = await this.getUserByUserName(userName);
        if(user == null) {
            return null;
        } else if(user.password == password) {
            return user;
        } else {
            return null;
        }
    }

    close() {
        this.userStorage.close();
    }
}

module.exports = UserService;