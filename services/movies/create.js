const Movie = require("../../models/movies");
const axios = require("axios");
const moment = require("moment");

module.exports = async (data, user) => {
  if (!data.title) {
    throw new Error("Title is required");
  }
  try {
    const monthStart = moment().startOf("month");
    const monthEnd = moment().endOf("month");
    const currentMonthMovies = await Movie.count({
      createdAt: {
        $gte: monthStart.toDate(),
        $lte: monthEnd.toDate(),
      },
    });

    console.log(currentMonthMovies);

    console.log(user);

    if (user.role === "basic" && currentMonthMovies == 5) {
      throw new Error(
        "You have exceeded your limit of 5 movies per month, upgrade to premium to get unlimited access"
      );
    }
    const API_KEY = "59c77920";
    const result = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${data.title}`
    );
    const movie = result.data;
    const newMovie = {
      userId: user.userId,
      title: movie.Title,
      released: movie.Released,
      director: movie.Director,
    };
    const savedMovie = await Movie.create(newMovie);
    return savedMovie;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
