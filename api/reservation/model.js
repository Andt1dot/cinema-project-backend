const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    premiere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Premieres",
      require: true,
    },

    seats: [
      {
        seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seats" },
        client_type: {
          type: String,
          enum: ["Copil", "Elev", "Student", "Adult", "Pensionar"],
          require: true,
        },
      },
    ],

    parent_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    reserv_date: {
      type: Date,
      required: true,
    },

    reserv_hour: {
      type: String,
      required: true,
    },

    total_price: {
      type: Number,
    },

    status: {
      type: String,
      require: true,
      enum: ["Complete", "Incomplete"],
    },
  },
  {
    timestamps: true,
  }
);

const reservationModel = mongoose.model("Reservations", reservationSchema);
module.exports = reservationModel;
