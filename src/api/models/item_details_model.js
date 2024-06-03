const { sequelize, DataTypes } = require('../../config/database.config');

const ItemDetails = sequelize.define('ItemDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'item_details',
  timestamps: false,
});

module.exports = ItemDetails;
