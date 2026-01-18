import type { Request, Response } from "express";
import { Item } from "../models/itemModel.js";
import { getDailyUsage, getLowStockItems, getMonthlyUsage } from "../utils/stockReports.js";

export const dailyReports = async (req: Request, res: Response) => {
  const date = req.query.date
    ? new Date(req.query.date as string)
    : new Date();

  const usage = await getDailyUsage(date);

  const populated = await Item.populate(usage, {
    path: "_id",
    select: "name unit",
  });

  res.json({
    date,
    usage: populated,
  });
}

export const monthlyReports = async (req: Request, res: Response) => {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  if (!year || !month) {
    return res.status(400).json({ message: "Year and month required" });
  }

  const usage = await getMonthlyUsage(year, month);

  const populated = await Item.populate(usage, {
    path: "_id",
    select: "name unit",
  });

  res.json({
    year,
    month,
    usage: populated,
  });
}

export const stockAlert = async (req: Request, res: Response) => {
  const lowStock = await getLowStockItems();
  res.json(lowStock);
}
