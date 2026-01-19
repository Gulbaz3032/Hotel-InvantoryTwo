import { Router } from "express";
import { categoryController, getAllCategory, updateCategory } from "../controllers/categorController.js";

const router = Router();

router.post("/create-category", categoryController),
router.get("/get-all", getAllCategory);
router.put("/category/:id", updateCategory);

export default router;