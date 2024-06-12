const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlResultTypes = sequelize.define('CrawlResultTypes', {
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
  is_textfield: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'crawl_result_types',
  timestamps: false,
});

module.exports = CrawlResultTypes;
