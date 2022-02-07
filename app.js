require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const movieRoutes = require("./routes/movies.route");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/movies", movieRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  if (error.status === 404) {
    return res.status(200).json({
      message:
        "No resource avaliable on this route visit: https://github.com/mikkybang/netguru-movie-service#readme",
    });
  } else {
    res.status(400).json({
      message: "An Error Occured",
      error: error,
    });
  }
});

const port = process.env.PORT || 5000;

//server code
const server = app.listen(port, async () => {
  console.log(`running → PORT ${server.address().port}`);
});

module.exports = server;
