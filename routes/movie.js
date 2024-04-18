const express = require("express");

// create express router for movies
const router = express.Router();

// Load all the models
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const genre = req.query.genre;
    const rating = req.query.rating;
    let movies = [];
    if (genre) {
        movies = await Movie.find({ genre: genre });     
    } 
    else if (rating) {
        movies = await Movie.find({ rating: { $gt: rating }});
    }
    else {
        movies = await Movie.find();
    }
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send({
        message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById();
    res.status(200).send(movie);
});

module.exports = router;
// export default router;

