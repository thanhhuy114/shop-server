const { sequelize, DataTypes } = require('../../config/database.config');

const Websites = sequelize.define('Websites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'websites',
  timestamps: false,
});

module.exports = Websites;
