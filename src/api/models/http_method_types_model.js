const { sequelize, DataTypes } = require('../../config/database.config');

const HttpMethodType = sequelize.define('CrawlOptionTypes', {
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
  have_body: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  have_headers: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'http_method_types',
  timestamps: false,
});

module.exports = HttpMethodType;
