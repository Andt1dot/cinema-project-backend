const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const newsModel = mongoose.model("News", newsSchema);

module.exports = newsModel;