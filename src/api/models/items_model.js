const { sequelize, DataTypes } = require('../../config/database.config');

const Items = sequelize.define('Items', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  website_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  crawl_config_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'items',
  timestamps: false,
});

module.exports = Items;
