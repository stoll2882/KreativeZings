
function User(userName, password, firstName, lastname, phoneNumber, email) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.email = email;
}

module.exports = User;