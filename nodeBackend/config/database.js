const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventory_system', 'root', '', {
  host: 'localhost',
  port: 3305,
  dialect: 'mysql',
  logging: false, // Disable logging SQL queries (optional)
});

module.exports = sequelize;
