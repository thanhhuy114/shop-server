const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlTypes = sequelize.define('CrawlTypes', {
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
  tableName: 'crawl_types',
  timestamps: false,
});

module.exports = CrawlTypes;
