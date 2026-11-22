// Import Express
const express = require("express");

// Import dotenv
require("dotenv").config();

// Import the Track model
const { Track } = require("./database/setup");

// Create Express application
const app = express();

// Middleware to read JSON data from requests
app.use(express.json());

// Set the port from the .env file
const PORT = process.env.PORT || 3000;

/*
====================================================
GET ALL TRACKS
GET /api/tracks
====================================================
*/
app.get("/api/tracks", async (req, res) => {
  try {
    // Retrieve all tracks from the database
    const tracks = await Track.findAll();

    // Return the results
    res.status(200).json(tracks);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

/*
====================================================
GET TRACK BY ID
GET /api/tracks/:id
====================================================
*/
app.get("/api/tracks/:id", async (req, res) => {
  try {
    // Find track by primary key
    const track = await Track.findByPk(req.params.id);

    // Check if track exists
    if (!track) {
      return res.status(404).json({
        error: "Track not found",
      });
    }

    // Return the track
    res.status(200).json(track);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

/*
====================================================
CREATE NEW TRACK
POST /api/tracks
====================================================
*/
app.post("/api/tracks", async (req, res) => {
  try {
    const {
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear,
    } = req.body;

    // Validate required fields
    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({
        error: "songTitle, artistName, albumName, and genre are required",
      });
    }

    // Create new track
    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear,
    });

    // Return created track
    res.status(201).json(newTrack);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

/*
====================================================
UPDATE TRACK
PUT /api/tracks/:id
====================================================
*/
app.put("/api/tracks/:id", async (req, res) => {
  try {
    // Find the track first
    const track = await Track.findByPk(req.params.id);

    // Check if it exists
    if (!track) {
      return res.status(404).json({
        error: "Track not found",
      });
    }

    // Update the record
    await track.update(req.body);

    // Return updated track
    res.status(200).json(track);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

/*
====================================================
DELETE TRACK
DELETE /api/tracks/:id
====================================================
*/
app.delete("/api/tracks/:id", async (req, res) => {
  try {
    // Find the track first
    const track = await Track.findByPk(req.params.id);

    // Check if it exists
    if (!track) {
      return res.status(404).json({
        error: "Track not found",
      });
    }

    // Delete the track
    await track.destroy();

    // Return success message
    res.status(200).json({
      message: "Track deleted successfully",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

/*
====================================================
START THE SERVER
====================================================
*/
app.listen(PORT, () => {
  // Display server start message
  console.log(`Server running on port ${PORT}`);
});