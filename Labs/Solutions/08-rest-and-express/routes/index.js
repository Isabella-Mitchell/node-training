const router = require("express").Router();
const userRoutes = require("./users.js");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.use("/users", userRoutes);

router.get("/", (req, res) => {
  res.send("hello from express");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true, message: "Got it" });
});

module.exports = router;
