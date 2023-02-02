const { DataTypes } = require('sequelize');
const DB = require("../config/DB");


const Stock = DB.define('Stock', {
    BatchId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Stock;