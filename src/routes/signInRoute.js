const express = require('express');
const signInController = require('../controllers/signInController');

const signInRoute = express.Router();

signInRoute.post("/", signInController);

module.exports.signInRoute = signInRoute;