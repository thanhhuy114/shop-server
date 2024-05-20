const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();


const db = {
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
}

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});


module.exports = { sequelize, DataTypes }