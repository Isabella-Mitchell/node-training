const router = require("express").Router();

const { getAllBooks, getBookById, createBook } = require("../store/index");

router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("error with request");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const books = await getBookById(id);
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send("error with request");
  }
});

router.post("/", async (req, res) => {
  try {
    await createBook(req.body);
    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send("error with request");
  }
});

// router.patch("/:id");

// router.delete("/:id");

// router.post("/:id");

module.exports = router;
