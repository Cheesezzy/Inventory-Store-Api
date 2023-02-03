const express = require('express');
const {createstock, fetchstocks} = require('../controllers/stockController');

const stockRoute = express.Router();

stockRoute.post("/", createstock);
stockRoute.get("/", fetchstocks);


module.exports.stockRoute = stockRoute;