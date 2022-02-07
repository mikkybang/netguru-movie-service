const Movie = require("../../models/movies");
const axios = require("axios");

module.exports = async (data, user) => {
  if (!data.title) {
    throw new Error("Title is required");
  }
  try {
    const result = await axios.get(
      `http://www.omdbapi.com/?apikey=${yourkey}&t=${data.title}`
    );
    const movie = result.data;
    const newMovie = {
      userId: user.userId,
      title: movie.title,
      released: movie.released,
      director: movie.director,
    };
    const savedMovie = await Movie.create(newMovie);
    return savedMovie;
  } catch (error) {
    console.log(error);
    throw new Error(error.Error);
  }
};
