const { sequelize, DataTypes } = require('../../config/database.config');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promotion: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    rate_starts: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rate_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sold_count: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    website_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;