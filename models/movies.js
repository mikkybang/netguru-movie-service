const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
    },
    title: { type: String },
    released: { type: Date },
    genre: { type: String },
    director: { type: String },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
