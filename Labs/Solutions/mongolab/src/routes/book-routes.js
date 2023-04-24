import { Router } from "express";
import * as bookController from "../controllers/book-controllers.js";

const router = Router();

router.get("/", bookController.getAllBooks);

export default router;
