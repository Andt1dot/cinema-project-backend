const router = require("express").Router();
const Seats = require("./model");
const { validateSeat, checkSeatExists } = require("./middleware");
const { registeredAccess, staffAccess } = require("../auth/middleware");

router.get("/", async (req, res, next) => {
  try {
    const seats = await Seats.find().exec();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:seat_id",
  registeredAccess,
  checkSeatExists,
  async (req, res, next) => {
    try {
      const foundSeat = await Seats.findById(req.params.seat_id)
        .populate({
          path: "hall",
          select: "name -_id",
          populate: { path: "cinema", select: "name -_id" },
        })
        .exec();
      res.status(200).json(foundSeat);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", staffAccess, validateSeat, async (req, res, next) => {
  try {
    const newSeat = await new Seats(req.body).save();
    res.status(201).json(newSeat);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:seat_id",
  staffAccess,
  validateSeat,
  checkSeatExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "hall") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});
    try {
      const updatedSeat = await Seats.findByIdAndUpdate(
        { _id: req.params.seat_id },
        bodyReducer
      ).exec();
      res.status(200).json(updatedSeat);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:seat_id",
  staffAccess,
  checkSeatExists,
  async (req, res, next) => {
    try {
      const deletedSeat = await Seats.findByIdAndDelete(
        req.params.seat_id
      ).exec();
      res.status(200).json(deletedSeat);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
