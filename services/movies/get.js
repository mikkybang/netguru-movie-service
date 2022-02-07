const Movie = require("../../models/movies");

module.exports = async (user) => {
  if (!user) throw new Error("User not found");
  try {
    const movies = await Movie.find({
      userId: user.userId,
    });
    if (movies.length < 1) {
      return [];
    }
    return movies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
