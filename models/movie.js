const mongoose = require("mongoose");
const { Schema, model } = mongoose;


// Setup the schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: String,
    release_year: Number,
    genre: String,
    rating: Number
});

// Convert the schema to a model
const Movie = model("Movie", movieSchema);
module.exports = Movie;

