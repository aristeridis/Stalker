const router = require("express").Router();
const authMW = require("../middlewares/authMW");
const Theatre = require("../models/theatresModel");
const Show = require("../models/showModel");
router.post("/add-theatre", authMW, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/get-all-theatres", authMW, async (req, res) => {
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
router.get("/get-all-theatres-by-owner", authMW, async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
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
router.post("/update-theatre", authMW, async (req, res) => {
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
router.post("/delete-theatre", authMW, async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/add-show", authMW, async (req, res) => {
  try {
    const newShow = new Theatre(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.get("/get-all-shows-by-theatre", authMW, async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId })
      .populate("movie")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Shows retrieved",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/delete-show", authMW, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/get-all-theatres-by-movie", authMW, async (req, res) => {
  try {
    const [movie, date] = req.body;
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });
    let uniqueTheatres = [];
    shows.forEach((show) => {
      const theatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );
      if (!theatre) {
        const showsForThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({ ...show.theatre, shows: showsForThisTheatre });
      }
    });
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
router.get("/get-show-by-id/", authMW, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Got the Show ",
      data: show,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
