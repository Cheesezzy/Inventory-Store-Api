const { config } = require('dotenv');

const env = config().parsed;

module.exports = env;