const express = require('express');
const signUpController = require("../controllers/signUpController");

const signUpRoute = express.Router();

signUpRoute.post("/", signUpController);

module.exports.signUpRoute = signUpRoute;