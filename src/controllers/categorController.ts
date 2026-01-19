import type { Request, Response } from "express";
import { Category } from "../models/categoryModel.js";

export const categoryController = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create(
           {
             name,
            description
           }
        );

        if(!name || !description) {
            return res.status(400).json({
                message: "Fileds are required",
                success: false
            });
        }
        return res.status(201).json({
            message: "Category created successfully",
            success: true,
             category: category
        })
    } catch (error) {
        console.log("Server error, faied to create category", error);
        return res.status(500).json({
            message: "Failed to created Category, server error",
            success: false
        });
    }
}

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            message: "categories get successfully",
            success: true,
            categories: categories
        })
    } catch (error) {
        console.log("Failed to get category, server error", error);
        return res.status(500).json({
            message: "Server error, Failed to get categories"
        })
    }
}


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name && !description) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or description) is required to update",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Failed to update category", error);
    return res.status(500).json({
      success: false,
      message: "Server error, failed to update category",
    });
  }
};
