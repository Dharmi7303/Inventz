const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'category', // Specify the correct table name here
    timestamps: false // Disable timestamps if you don't have createdAt and updatedAt columns
});

module.exports = Category;
