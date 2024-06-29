const { sequelize, DataTypes } = require('../../config/database.config');

const ItemTypesModel = sequelize.define('UserTypes', {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  max_configs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'user_types',
  timestamps: false,
});

module.exports = ItemTypesModel;