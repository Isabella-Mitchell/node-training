const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3030;
const routes = require("./routes");

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server started, listening on port ${port}.`);
});
