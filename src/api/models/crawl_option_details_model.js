const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlOptionDetails = sequelize.define('CrawlOptionDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  crawl_detail_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  option_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  option_value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  new_value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  option_condition_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  condition_value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'crawl_option_details',
  timestamps: false,
});

module.exports = CrawlOptionDetails;
