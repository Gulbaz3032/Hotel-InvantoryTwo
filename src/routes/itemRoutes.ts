import { Router } from "express";
import { createItem, getAllItems } from "../controllers/itemController.js";

const router = Router();

router.post("/create-item", createItem);
router.get("/get-item", getAllItems);

export default router;