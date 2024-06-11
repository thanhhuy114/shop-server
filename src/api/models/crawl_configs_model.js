const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlConfigs = sequelize.define('CrawlConfigs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  crawl_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  result_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  item_selector: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  item_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  website_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  is_complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'crawl_configs',
  timestamps: false,
});

module.exports = CrawlConfigs;
