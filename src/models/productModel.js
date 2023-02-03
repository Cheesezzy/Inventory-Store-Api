const { DataTypes } = require('sequelize');
const DB = require("../config/DB");
const stock = require("./stockModel");


const Product = DB.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Product.hasMany(stock, {foreignKey: "productId", as:"stocks"})

stock.belongsTo(Product, {foreignKey:"productId", as:"product"})

module.exports = Product;