import { Router } from "express";
import * as controller from "./bookControllers.js";

const router = Router();

router.route("/").get(controller.getAllBooks).post(controller.createBook);

router
  .route("/:id")
  .get(controller.getSingleBook)
  .put(controller.updateBook)
  .delete(controller.deleteBook);

export default router;
