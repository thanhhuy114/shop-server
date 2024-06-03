const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlDetails = sequelize.define('CrawlDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  crawl_config_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  selector: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attribute: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  data_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'crawl_details',
  timestamps: false,
});

module.exports = CrawlDetails;
