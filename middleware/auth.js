const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      if (token) {
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded) {
            req.user = decoded;
            next();
          }
        } catch (e) {
          res
            .status(401)
            .json({ message: "Invalid token", error: "token has expired" });
          return;
        }
      }
    } catch (e) {
      res
        .status(401)
        .json({ message: "Invalid token", error: "token is not valid" });
      return;
    }
  } else {
    res.status(401).json({
      message: "Authorizarion failed",
      error: "No Authorization token",
    });
    return;
  }
};
