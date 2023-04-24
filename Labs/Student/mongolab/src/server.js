import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import bookRoutes from "./routes/book-routes.js";

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use("/api/books", bookRoutes);

export default app;
