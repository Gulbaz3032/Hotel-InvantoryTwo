import { Router } from "express";
import { createItem, getAllItems, updateItem } from "../controllers/itemController.js";

const router = Router();

router.post("/create-item", createItem);
router.get("/get-item", getAllItems);
router.put("/hotel/item/:id", updateItem);

export default router;