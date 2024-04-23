const express = require("express");

const {
    getTvShow,
    addTvShow,
    updateTvShow,
} = require("../controllers/tvshow");

const router = express.Router();

const TvShow = require("../models/tvshow");

router.get("/", async ( req, res ) => {
    try {
        // const genre = req.query.genre;
        // const rating = req.query.rating;
        // const premiere_year = req.query.premiere_year;
        // let tvshows = [];
        // if (genre) {
        //     tvshows = await Tvshow.find({ genre: genre});
        // } else if (rating) {
        //     tvshows = await Tvshow.find({ rating: { $gt: rating }});
        // } else if (premiere_year) {
        //     tvshows = await Tvshow.find( {premiere_year: { $gt: premiere_year }});
        // } else {
        //     tvshows = await Tvshow.find();
        // }
        // res.status(200).send(tvshows);
        const genre = req.query.genre;
        const rating = req.query.rating;
        const premiere_year = req.query.premiere_year;
        const tvshows = await getTvShow( premiere_year, genre, rating)
        res.status(200).send(tvshows);

    } catch (error) {
    res.status(400).send({
        message: error.message,
    });
  }
});

router.get("/:id", async ( req, res ) => {
  try {
    const tvshow = await TvShow.findById(req.params.id);
    res.status(200).send(tvshow);
  } catch (error) {
    res.status(400).send({
        message: error.message
    });
  }
});

router.post("/", async (req, res) => {
    try {
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;
        const newTvShow = await addTvShow(
            title,
            creator,
            premiere_year,
            end_year,
            seasons,
            genre,
            rating
        );
        res.status(200).send(newTvShow);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const tvshow_id = req.params.id;
        const title = req.body.title;
        const creator = req.body.creator;
        const premiere_year = req.body.premiere_year;
        const end_year = req.body.end_year;
        const seasons = req.body.seasons;
        const genre = req.body.genre;
        const rating = req.body.rating;
        const updatedTvShow = await updateTvShow(
            tvshow_id,
            title,
            creator,
            premiere_year,
            end_year,
            seasons,
            genre,
            rating
        );
        res.status(200).send(updatedTvShow);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      // put deleteMovie function here
      const tvshow_id = req.params.id
      await TvShow.findByIdAndDelete(tvshow_id);
      res.status(200).send("Succesfully deleted");
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  });
  





module.exports = router;
