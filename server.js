const express = require("express");
const mongoose = require("mongoose");

// create the express app
const app = express();

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");

app.use("/movies", movieRouter);
app.use("/tvshow", tvshowRouter);

// Start the server
app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
