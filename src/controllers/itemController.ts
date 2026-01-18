import type { Request, Response } from "express";
import { Item } from "../models/itemModel.js";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, unit, minStockLevel, categoryId } = req.body;

    const item = await Item.create({
        name, unit, minStockLevel, categoryId
    });

    return res.status(201).json({
        message: "items created successfully",
        success: true,
        item: item
    })
  } catch (error) {
    console.log("Failed ot create Item, Server error", error);
    return res.status(500).json({
      message: "Failed to create item, Server error",
      success: false,
    });
  }
};


export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find().populate("categoryId");
        if(!items) {
            return res.status(404).json({
                message: "Items not found", 
                success: false
            })
        }

        return res.status(200).json({
            message: "Items get successfully",
            success: true,
            items: items
        })
    } catch (error) {
        console.log("Failed to get all items, Server error", error);
        return res.status(500).json({
            message: "Failed to get all items, Server error",
            success: false
        })
    }
}
