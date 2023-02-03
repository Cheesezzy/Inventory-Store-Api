const { DataTypes } = require('sequelize');
const DB = require("../config/DB");
const Product = require('./productModel');


const Stock = DB.define('Stock', {
    id:{
        type: DataTypes.UUID,
            primaryKey:true,
            allowNull: false
    },
    batchId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Stock;