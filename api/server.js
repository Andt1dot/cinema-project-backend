require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cloudinary = require("cloudinary").v2;
const movieRouter = require("./movie/router");
const cinemaRouter = require("./cinema/router");
const newsRouter = require("./news/router");
const hallRouter = require("./hall/router");
const seatRouter = require("./seat/router");
const premiereRouter = require("./premiere/router");
const reservationRouter = require("./reservation/router");
const ticketRouter = require("./ticket/router");
const userRouter = require("./user/router");
const mediaRouter = require("../cloudinary/router");
const notificationRouter = require("./notification/router");
const authRouter = require("./auth/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.8bs0p.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

if (typeof process.env.CLOUDINARY_URL === "undefined") {
  console.warn("!! cloudinary config is undefined !!");
  console.warn("export CLOUDINARY_URL or set dotenv file");
} else {
  console.log("cloudinary config:");
  console.log(cloudinary.config());
}
server.use("/static", express.static("public"));
server.use(helmet());
server.use(cors());
server.use(morgan("combined"));
server.use(cookieParser());
server.use(express.json());
/*server.use(
  express.urlencoded({
    extended: true,
  })
);*/
server.use("/api/auth", authRouter);
server.use("/api/movies", movieRouter);
server.use("/api/cinemas", cinemaRouter);
server.use("/api/news", newsRouter);
server.use("/api/halls", hallRouter);
server.use("/api/seats", seatRouter);
server.use("/api/premieres", premiereRouter);
server.use("/api/reservations", reservationRouter);
server.use("/api/tickets", ticketRouter);
server.use("/api/users", userRouter);
server.use("/api/notifications", notificationRouter);
server.use(mediaRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to Olymp Cinema !</h1>`);
});

server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({ message: "Something went wrong, please try again." });
});

module.exports = server;
