import { Router } from "express";
import { categoryController, getAllCategory } from "../controllers/categorController.js";

const router = Router();

router.post("/create-category", categoryController),
router.get("/get-all", getAllCategory);

export default router;