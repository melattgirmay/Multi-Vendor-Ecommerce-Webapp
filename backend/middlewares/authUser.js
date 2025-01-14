//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\backend\middlewares\authUser.js
const jwt = require("jsonwebtoken");

const authUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authUserMiddleware;