import { Router } from "express";
import * as controller from "./bookControllers.js";
import { headerCheck } from "./authMiddleware.js";
import { inputValidation } from "./validatorMiddleware.js";

const router = Router();
router.use(inputValidation);

router.route("/").get(controller.getAllBooks).post(controller.createBook);

router
  .route("/:id")
  .get(controller.getSingleBook)
  .put(controller.updateBook)
  .delete(controller.deleteBook);

export default router;
