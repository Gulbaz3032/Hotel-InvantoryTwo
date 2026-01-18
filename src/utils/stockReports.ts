import { startOfDay, endOfDay } from "date-fns";
import { startOfMonth, endOfMonth } from "date-fns";
import { Stock } from "../models/stockTransictionModel.js";

import { Item } from "../models/itemModel.js";
import { calculateStock } from "./calculateStock.js";

export const getDailyUsage = async (date: Date) => {
  return Stock.aggregate([
    {
      $match: {
        type: "OUT",
        createdAt: {
          $gte: startOfDay(date),
          $lte: endOfDay(date),
        },
      },
    },
    {
      $group: {
        _id: "$itemId",
        totalUsed: { $sum: "$quantity" },
      },
    },
  ]);
};


export const getMonthlyUsage = async (year: number, month: number) => {
  return Stock.aggregate([
    {
      $match: {
        type: "OUT",
        createdAt: {
          $gte: startOfMonth(new Date(year, month - 1)),
          $lte: endOfMonth(new Date(year, month - 1)),
        },
      },
    },
    {
      $group: {
        _id: "$itemId",
        totalUsed: { $sum: "$quantity" },
      },
    },
  ]);
};



export const getLowStockItems = async () => {
  const items = await Item.find();

  const lowStockItems = [];

  for (const item of items) {
    const stock = await calculateStock(item._id);

    if (stock <= item.minStockLevel) {
      lowStockItems.push({
        itemId: item._id,
        name: item.name,
        currentStock: stock,
        minStockLevel: item.minStockLevel,
      });
    }
  }

  return lowStockItems;
};


