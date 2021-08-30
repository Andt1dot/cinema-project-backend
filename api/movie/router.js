const router = require("express").Router();
const Movies = require("./model");
const cloudinary = require("cloudinary").v2;
const { validateMovie, checkMovieExists } = require("./middleware");
const { staffAccess } = require("../auth/middleware");

router.get("/", staffAccess, async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.skip ? parseInt(req.query.skip) : 0;

    const movies = await Movies.find({}).skip(offset).limit(limit);

    const moviesCount = await Movies.countDocuments();

    const totalPages = Math.ceil(moviesCount / limit);
    const currentPage = Math.ceil(moviesCount % offset);

    res.status(200).send({
      data: movies,
      paging: {
        total: moviesCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:movie_id",
  staffAccess,
  checkMovieExists,
  async (req, res, next) => {
    try {
      const movie = await Movies.findById(req.params.movie_id).exec();
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }
);

/// TEST ROUTE

/*
router.get(
  "/display/:movie_id",
  staffAccess,
  checkMovieExists,
  async (req, res, next) => {
    Movies.findById(req.params.movie_id)
      .exec()
      .then((movie) => {
        console.log("movie", movie);
        res.status(200);
        res.send(`<h1>${movie.title}</h1>
      <img src=${movie.image_url}>
      <iframe src=${movie.video_url} allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen frameborder="0"></iframe>
      `);
      })
      .catch(next);
  }
);*/

router.post("/", staffAccess, validateMovie, async (req, res, next) => {
  const {
    title,
    original_title,
    genre,
    age_restrict,
    director,
    release_date,
    rating,
    description,
    actors,
    duration,
    image_url,
    video_url,
  } = req.body;

  new Movies({
    title,
    original_title,
    genre: genre.split(","),
    age_restrict,
    director,
    release_date,
    rating,
    description,
    actors: actors.split(","),
    duration,
    image_url,
    video_url,
  })
    .save()
    .then((newMovie) => {
      res.status(201).json(newMovie);
    })
    .catch(next);
});

router.put(
  "/:movie_id",
  staffAccess,
  validateMovie,
  checkMovieExists,
  async (req, res, next) => {
    const bodyReducer = Object.keys(req.body).reduce((acc, curr) => {
      if (req.body[curr] && curr !== "_id") {
        acc[curr] = req.body[curr];
      }
      return acc;
    }, {});
    Movies.findByIdAndUpdate(req.params.movie_id, bodyReducer)
      .exec()
      .then((updatedMovie) => {
        res.status(200).json(updatedMovie);
      })
      .catch(next);
  }
);

router.delete(
  "/:movie_id",
  staffAccess,
  checkMovieExists,
  async (req, res, next) => {
    Movies.findByIdAndDelete(req.params.movie_id)
      .exec()
      .then((removeMovie) => {
        res.status(200).json(removeMovie);
      })
      .catch(next);
  }
);

module.exports = router;
