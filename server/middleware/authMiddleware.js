const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const parts = authorization.trim().split(/\s+/);

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer" || !parts[1]) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(503).json({ success: false, message: "Authentication service is not configured." });
  }

  try {
    req.user = jwt.verify(parts[1], process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

module.exports = protect;