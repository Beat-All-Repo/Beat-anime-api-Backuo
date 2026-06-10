module.exports = (req, res, next) => {
  // Allow health check and homepage
  if (req.path === "/") {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key required"
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key"
    });
  }

  next();
};
