const express = require("express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3100;
const bookRoutes = require("./routes/books");

const app = express();

app.use(express.json());

app.use("/api/v1/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
