const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = decoded;

      return next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: "No Token Found",
  });
};

module.exports = protect;