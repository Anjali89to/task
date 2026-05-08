const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1]; // 🔥 IMPORTANT

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ message: "Invalid token" });
  }
};

module.exports = auth;