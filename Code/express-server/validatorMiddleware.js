export function inputValidation(req, res, next) {
  if (
    req.query["title"] !== "" &&
    req.query["author"] !== "" &&
    req.query["title"].length > 1 &&
    req.query["author"].length > 1
  ) {
    next();
    return;
  }

  res
    .status(403)
    .json({ message: "Invalid Input. Please try again", error: true });
}
