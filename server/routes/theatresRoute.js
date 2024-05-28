const router = require('express').Router();
const authMW = require('../middlewares/authMW');
const Theatre = require('../models/theatresModel');
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "Theatre added"
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get('/get-all-theatres', async (req, res) => {
    try {
        const theatres = await Theatre.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Theatres retrieved",
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.get('/get-all-theatres-by-owner', async (req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.body.owner }).sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Theatres retrieved",
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});
router.post('/update-theatre', async (req, res) => {
    try {
await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
res.send({
    success: true,
    message: "Theatre updated",
});
    } catch (error) {
        res.send({
             success: false,
             message: error.message,
        });
    }
});
module.exports = router;