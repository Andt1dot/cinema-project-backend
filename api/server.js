require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.8bs0p.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

const server = express();
const error = require("./middleware/error");
const movieRouter = require("./movie/router");

server.use(express.json());
server.use("/api/movies", movieRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to our Cinema !</h1>`);
});

server.use(error);
module.exports = server;
