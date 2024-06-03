const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlOptionConditionTypes = sequelize.define('CrawlOptionConditionTypes', {
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
  tableName: 'crawl_option_condition_types',
  timestamps: false,
});

module.exports = CrawlOptionConditionTypes;