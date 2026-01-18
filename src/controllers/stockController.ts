import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Item } from "../models/itemModel.js";
import { Stock } from "../models/stockTransictionModel.js";
import { calculateStock } from "../utils/calculateStock.js";

export const stocksIn = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity, note } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        message: "Invalid itemId",
        success: false,
      });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    const transaction = await Stock.create({
      itemId,
      quantity,
      type: "IN",
      note,
    });

    const stock = await calculateStock(item._id);

    return res.status(201).json({
      message: "Stock added",
      transaction,
      currentStock: stock,
    });
  } catch (error) {
    console.log("Failed to IN stocks, Server error", error);
    return res.status(500).json({
      message: "Failed to IN stocks, Server error",
      success: false,
    });
  }
};

export const stockOut = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity, note } = req.body;
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        message: "Invalid itemId",
        success: false,
      });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        message: "item not found",
        success: false,
      });
    }

    const currentStock = await calculateStock(item._id);
    if (currentStock < quantity) {
      return res.status(400).json({
        message: "Not enough stock",
        currentStock,
      });
    }

    const transaction = await Stock.create({
      itemId,
      quantity,
      type: "OUT",
      note,
    });

    const updatedStock = await calculateStock(item._id);
    return res.status(201).json({
      message: "Stock used",
      transaction,
      currentStock: updatedStock,
    });
  } catch (error) {
    console.log("Failed to out the stock, Server error", error);
    return res.status(500).json({
      message: "Failed to out the stock, Server error",
      success: false,
    });
  }
};

export const getStock = async (req: Request <{ itemId: string }>, res: Response) => {
    try {

        const { itemId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                message: "Invalied id"
            });
        }

        const stock = await calculateStock(
            new mongoose.Types.ObjectId(itemId)
        )

        res.json({ itemId, stock })

    } catch (error) {
        console.log("Failed to get Stocks, Server error", error);
        return res.status(500).json({
            message: "Failed to get Stocks, Server error",
            success: false
        })
    }
}
