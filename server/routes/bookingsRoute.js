const router = require("express").Router();
const authMW = require("../middlewares/authMW");
const Booking = require("../models/bookingsModel");
const Show = require("../models/showModel");
router.post("/book-show", authMW, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show);

    await Show.findOneAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });
    res.send({
      success: true,
      message: "Booking added",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
