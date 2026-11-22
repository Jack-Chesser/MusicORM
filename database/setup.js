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



// Create an async function to set up the database
async function setupDatabase() {
  try {
    // Test the connection to the database
    await sequelize.authenticate();

    // Create the table based on the Track model
    await sequelize.sync();

    // Display success message
    console.log("Database and tables created successfully.");
  } catch (error) {
    // Display any errors
    console.error("Error creating database:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Only run setupDatabase when this file is executed directly
if (require.main === module) {
  setupDatabase();
}

// Export the database connection and Track model
module.exports = { sequelize, Track };