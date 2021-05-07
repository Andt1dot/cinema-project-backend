const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    premiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Premieres",
      require: true,
    },

    seat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seats",
      require: true,
    },

    parent_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },

    reserv_date: {
      type: Date,
      required: true,
    },

    total_price: {
      type: Number,
    },
    user_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservations", reservationSchema);
module.exports = reservationModel;
