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

   Product.hasMany(stock,{
    foreignKey: "productId",
    as: "Stock"
   });

   stock.belongsTo(Product, {
    foreignKey: "BatchId",
    as: "Product"
   });