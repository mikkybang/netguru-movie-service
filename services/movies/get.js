const Movie = require("../../models/movies");

module.exports = async (user) => {
  if (!user) throw new Error("User not found");
  try {
    const movies = await Movie.find({
      userId: user.id,
    });

    if (movies.length < 1) {
      throw new Error("User does not have movies");
    }
    return movies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
