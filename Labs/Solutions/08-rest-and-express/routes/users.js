const router = require("express").Router();
const { getUser, addUser } = require("../controllers/userController");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/:id", getUser);
router.post("/", addUser);

module.exports = router;
