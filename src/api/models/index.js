const sequelize = require('../config/database');
const Product = require('./product');

const db = {
    sequelize,
    Product,
};

sequelize.sync();

module.exports = db;