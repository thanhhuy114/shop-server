const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlDataTypes = sequelize.define('CrawlDataTypes', {
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
  crawl_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'crawl_data_types',
  timestamps: false,
});

module.exports = CrawlDataTypes;
