
const { Sequelize } = require("sequelize");
const env = require (".");


const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = env;

module.exports = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect:"postgres", 
        logging : false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnautorized: false
            }
        }
    }
)