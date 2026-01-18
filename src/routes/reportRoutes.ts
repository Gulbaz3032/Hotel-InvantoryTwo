import { Router } from "express";
import { dailyReports, monthlyReports, stockAlert } from "../controllers/reportController.js";

const router = Router();

router.get("/daily", dailyReports);
router.get("/monthly", monthlyReports)
router.get("/low-stock", stockAlert)


export default router;