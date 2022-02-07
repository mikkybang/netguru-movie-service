const router = require("express").Router();
const authenticate = require("../middleware/auth");
const {
  createMovies,
  getUserMovie,
} = require("../controller/movies.controller");

router
  .route("/")
  .post(authenticate, createMovies)
  .get(authenticate, getUserMovie);

module.exports = router;
