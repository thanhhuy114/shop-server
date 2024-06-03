const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlActionTypes = sequelize.define('CrawlActionTypes', {
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
  tableName: 'crawl_action_types',
  timestamps: false,
});

module.exports = CrawlActionTypes;
