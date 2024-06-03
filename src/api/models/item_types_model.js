const { sequelize, DataTypes } = require('../../config/database.config');

const ItemTypesModel = sequelize.define('ItemTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'item_types',
  timestamps: false,
});

module.exports = ItemTypesModel;
