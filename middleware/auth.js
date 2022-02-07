const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      if (token) {
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          if (decoded) {
            req.user = decoded;
            next();
          }
        } catch (e) {
          throw new Error("Invalid token");
        }
      }
    } catch (e) {
      throw new Error("Invalid token");
    }
  } else {
    throw new Error("No Authorization token");
  }
};
