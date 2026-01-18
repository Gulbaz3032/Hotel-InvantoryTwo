import { Router } from "express";
import { getStock, stockOut, stocksIn } from "../controllers/stockController.js";

const router = Router();

router.post("/in", stocksIn);
router.post("/out", stockOut);
router.get("/:itemId", getStock)


export default router;