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
    allowNull: false,
  },
  result_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  item_selector: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  item_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  website_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'crawl_configs',
  timestamps: false,
});

module.exports = CrawlConfigs;
