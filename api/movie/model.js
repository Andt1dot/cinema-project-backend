const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    original_title: {
      type: String,
    },
    genre: [
      {
        type: String,
        required: true,
      },
    ],
    director: {
      type: String,
    },
    release_date: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    actors: [String],

    age_restrict: {
      type: String,
      required: true,
      enum: ["AG", "AP-12", "N-15", "IM-18"],
    },
    duration: {
      type: String,
    },
    image_url: {
      type: String,
    },
    video_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;
