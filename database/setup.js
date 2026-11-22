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

// Create the Track model
const Track = sequelize.define("Track", {
  // Primary key that automatically increases
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  // Song title is required
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Artist name is required
  artistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Album name is required
  albumName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Genre is required
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Duration of the song in seconds
  duration: {
    type: DataTypes.INTEGER,
  },

  // Year the song was released
  releaseYear: {
    type: DataTypes.INTEGER,
  },
});
