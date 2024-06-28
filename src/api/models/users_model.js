const { sequelize, DataTypes } = require('../../config/database.config');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    package_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    out_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    config_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

module.exports = Users;
