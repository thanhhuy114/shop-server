const { sequelize, DataTypes } = require('../../config/database.config');

const ItemTypesModel = sequelize.define('PackageTypes', {
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
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'package_types',
  timestamps: false,
});

module.exports = ItemTypesModel;
