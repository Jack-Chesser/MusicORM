// Import Sequelize and DataTypes from sequelize
const { Sequelize, DataTypes } = require("sequelize");

// Load variables from the .env file
require("dotenv").config();

// Create a connection to the SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",

  // Database filename comes from the .env file
  storage: process.env.DATABASE_NAME,
});