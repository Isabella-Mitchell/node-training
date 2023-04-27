import express from "express";
import bookRouter from "./bookRoutes.js";
import { headerCheck } from "./authMiddleware.js";
const app = express();

// app.use(headerCheck);
app.use(express.json());
app.use(express.static("/public"));
app.use("/api/v1/books", bookRouter);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello, world!</h1>");
// });

// app.get("/:name/:excitement", (req, res) => {
//   res.send(
//     `<h1>Hello, ${req.params.name}! I see you are ${req.params.excitement}</h1>`
//   );
// });

// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("thanks for that!");
// });

export default app;
