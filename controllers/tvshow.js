const TvShow = require("../models/tvshow");

const getTvShow = async (premiere_year, genre, rating) => {
    try {
        let tvshows = [];
        if (genre) {
            tvshows = await TvShow.find({ genre: genre});
        } else if (rating) {
            tvshows = await TvShow.find({ rating: { $gt: rating }});
        } else if (premiere_year) {
            tvshows = await TvShow.find( {premiere_year: { $gt: premiere_year }});
        } else {
            tvshows = await TvShow.find();
        }
        res.status(200).send(tvshows);

    } catch (error) {
        throw new Error(error);
    }


}

const addTvShow = async (title, creator, premiere_year, end_year, seasons, genre, rating) => {
    const newTvShow = new TvShow({
        title,
        creator,
        premiere_year,
        end_year,
        seasons,
        genre,
        rating
    });

    await newTvShow.save();
    return newTvShow;
};

const updateTvShow = async (
    tvshow_id, title, creator, premiere_year, end_year, seasons, genre, rating

) => {
    const updateTvShow = await TvShow.findByIdAndUpdate(tvshow_id, {
        title, creator, premiere_year, end_year, seasons, genre, rating
    }, { new: true });
    return updateTvShow;
}

module.exports = {
    getTvShow,
    addTvShow,
    updateTvShow
};

