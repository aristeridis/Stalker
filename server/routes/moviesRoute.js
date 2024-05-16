const router = require('express').Router();
const Movie = require('../models/moviesModel')
const authMW = require('../middlewares/authMW');
const { message } = require('statuses');

router.post('/add-movie', authMW, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added"
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get('/get-all-movies', async (req, res) => {
    try {
        const movies = await Movie.find().sort({createdAt:-1});
        res.send({
            success: true,
            message: "Got the Movies ",
            data: movies
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });

    }
});
router.post('/update-movie', async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });

    }
});

module.exports = router;