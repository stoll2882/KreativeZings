class User {
    constructor(firstName, lastName, password, email, userName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
    }

    static fromJSON(json) {
        return new User(json.firstName, json.lastName, json.password, json.email, json.userName, json.phoneNumber);
    }

}

module.exports = User;
