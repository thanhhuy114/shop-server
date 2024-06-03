const { sequelize, DataTypes } = require('../../config/database.config');

const CrawlActionDetails = sequelize.define('CrawlActionDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  crawl_config_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  selector: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'crawl_action_details',
  timestamps: false,
});

module.exports = CrawlActionDetails;
