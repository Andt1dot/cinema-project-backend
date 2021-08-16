const router = require("express").Router();
const Reservations = require("./model");
const Seats = require("../seat/model");

const {
  checkReservationExists,
  validateNewReservation,
  checkSeatIsAvailable,
} = require("./middleware");
const {
  registeredAccess,
  staffAccess,
  validateUserIdentity,
} = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.skip ? parseInt(req.query.skip) : 0;

    const reservations = await Reservations.find({})
      .populate({
        path: "seats._id",
        model: Seats,
      })
      .populate({ path: "premiere", populate: { path: "movie" } })
      .skip(offset)
      .limit(limit);

    const reservationsCount = await Reservations.countDocuments();

    const totalPages = Math.ceil(reservationsCount / limit);
    const currentPage = Math.ceil(reservationsCount % offset);

    res.status(200).send({
      data: reservations,
      paging: {
        total: reservationsCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (err) {
    next(err);
  }

  // Reservations.find()
  //   .populate({
  //     path: "seats._id",
  //     model: Seats,
  //   })
  //   .populate({ path: "premiere", populate: { path: "movie" } })

  //   .then((reservations) => {
  //     res.status(200).json(reservations);
  //   })
  //   .catch(next);
});

router.get(
  "/:premiere_id/:cinema_id/:hall_id",
  registeredAccess,
  async (req, res, next) => {
    Reservations.find({
      premiere: req.params.premiere_id,
      reserv_date: req.query.date,
      reserv_hour: req.query.hour,
    })

      .distinct("seats")
      .exec()
      .then((reservations) => {
        if (reservations) {
          res.status(200).json(reservations);
        }
        res.status(404).json("Not found");
      })
      .catch(next);
  }
);

router.get(
  "/:reservation_id",
  staffAccess,
  checkReservationExists,
  async (req, res, next) => {
    Reservations.findById(req.params.reservation_id)
      .populate({
        path: "seats._id",
        model: Seats,
      })
      .exec()

      .then((reservation) => {
        res.status(200).json(reservation);
      })
      .catch(next);
  }
);

router.get(
  "/:user_id",
  registeredAccess,
  validateUserIdentity,
  async (req, res, next) => {
    Reservations.find({ parent_user: req.params.user_id })
      .populate("premiere", "-active")
      .populate("seat")
      .exec()
      .then((reservations) => {
        res.status(200).json(reservations);
      })
      .catch(next);
  }
);

router.get(
  "/:user_id/:reservation_id",
  registeredAccess,
  validateUserIdentity,
  checkReservationExists,
  async (req, res, next) => {
    Reservations.findOne({
      parent_user: req.params.user_id,
      _id: req.params.reservation_id,
    })
      .populate("premiere", "-active")
      .populate("seat")
      .exec()
      .then((reservation) => {
        if (reservation) {
          res.status(200).json(reservation);
        }
        return res.status(404).json("Not found.");
      })
      .catch(next);
  }
);

router.post(
  "/",
  registeredAccess,
  // validateNewReservation,
  // checkSeatIsAvailable,
  async (req, res, next) => {
    new Reservations({
      parent_user: req.decoded._id,
      seats: req.body.seats,
      premiere: req.body.premiere,
      reserv_date: req.body.reserv_date,
      reserv_hour: req.body.reserv_hour,
      total_price: req.body.total_price,
      status: req.body.status,
    })
      .save()
      .then((newReservation) => {
        res.status(201).json(newReservation);
      })
      .catch(next);
  }
);

router.put(
  "/:reservation_id",
  registeredAccess,
  checkReservationExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "parent_user") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});

    Reservations.findByIdAndUpdate(req.params.reservation_id, bodyReducer)
      .exec()
      .then((updatedReservation) => {
        res.status(200).json(updatedReservation);
      })
      .catch(next);
  }
);

router.delete(
  "/:reservation_id",
  registeredAccess,
  checkReservationExists,
  async (req, res, next) => {
    const reserv = await Reservations.findById(
      req.params.reservation_id
    ).exec();
    const updatedSeat = await Seats.findByIdAndUpdate(
      { _id: reserv.seat },
      { available: true }
    ).exec();
    console.log("updated seat after reserv deletion: ", updatedSeat.available);
    Reservations.findByIdAndDelete(req.params.reservation_id)
      .exec()
      .then((deletedReservation) => {
        res.status(200).json(deletedReservation);
      })
      .catch(next);
  }
);

module.exports = router;
