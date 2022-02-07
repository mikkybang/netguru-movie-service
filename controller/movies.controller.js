const { create, get } = require("../services/movies");

const createMovies = async (req, res) => {
  try {
    if (!req.body.title) throw new Error("title must be provided");
    const data = {
      title: req.body.title,
    };
    const result = await create(data, req.user);

    res.status(201).json({
      message: "Movie created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating movie",
      error: error.message,
    });
  }
};

const getUserMovie = async (req, res) => {
  try {
    const result = await get(req.user);
    res.status(201).json({
      message: "Movies",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error finding movies",
      error: error.message,
    });
  }
};

module.exports = {
  createMovies,
  getUserMovie,
};
