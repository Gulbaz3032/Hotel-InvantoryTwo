import type { Request, Response } from "express";
import { Item } from "../models/itemModel.js";
import mongoose from "mongoose";

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

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, unit, minStockLevel, categoryId } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID",
      });
    }

    // At least one field must be provided
    if (!name && !unit && minStockLevel === undefined && !categoryId) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(unit && { unit }),
        ...(minStockLevel !== undefined && { minStockLevel }),
        ...(categoryId && { categoryId }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("categoryId");

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Failed to update item, server error", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update item, server error",
    });
  }
};
