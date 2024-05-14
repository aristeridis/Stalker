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
    try {const movies =await Movie.find();
    res.send({
        success: true,
        message: "Got the Movies ",
        data:movies
    });
    }catch(error){
        res.send({
            success: false ,
            message: error.message,
        });

    }
});

module.exports=router;