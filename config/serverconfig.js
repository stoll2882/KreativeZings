const process = require('process')

var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
var PORT = process.env.PORT || 3002;
var ENVIRONMENT = process.env.ENVIRONMENT;
var DB_URL = process.env.DB_URL;

module.exports = { EMAIL_USERNAME, EMAIL_PASSWORD, PORT, ENVIRONMENT, DB_URL };