const express = require('express');
const { createProduct, fetchProducts } = require("../controllers/productController");

const productRoute = express.Router();

productRoute.post("/", createProduct);
productRoute.get("/", fetchProducts);


module.exports.productRoute = productRoute;