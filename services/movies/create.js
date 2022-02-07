const Movie = require("../../models/movies");
const axios = require("axios");

module.exports = async (data, user) => {
  if (!data.title) {
    throw new Error("Title is required");
  }
  try {
    const API_KEY = "59c77920";
    const result = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&t=${data.title}`
    );
    const movie = result.data;
    console.log(result);
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
    throw new Error(error.Error);
  }
};
