export function headerCheck(req, res, next) {
  if (req.headers["x-api-key"] && req.headers["x-api-key"] === "books-rule") {
    next();
  }

  res
    .status(403)
    .json({ message: "You're not allowed here, need api key", error: true });
}
