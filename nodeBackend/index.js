const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/category', categoryRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
