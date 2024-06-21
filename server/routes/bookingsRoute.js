const router = require("express").Router();
const stripe = require("stripe")(process.env.stripe_key);
const authMW = require("../middlewares/authMW");
const Booking = require("../models/bookingsModel");
const Show = require("../models/showModel");
router.post("/make-payment", authMW, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: "eur",
        customer: customer.id,
        receipt_email: token.email,
        description: "Agorastike",
      },
      {
        idempotencyKey: Math.random().toString(36).substring(7),
      }
    );
    const transactionId=charge.id;
    res.send({
      success: true,
      message: "Payment success",
      data: transactionId ,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
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
router.get("/get-all-bookings", authMW, async (req, res) => {
  try {
    const bookings = await Booking.find({user:req.body.userId}).populate("show").populate({
      path: "show",
      populate: {
        path: "movie",
        model: "movies",
      },
    }).populate("user").populate({
      path: "show",
      populate: {
        path: "theatre",
        model: "theatres",
      },});
    res.send({
      success: true,
      message: "Bookings retrieved",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
