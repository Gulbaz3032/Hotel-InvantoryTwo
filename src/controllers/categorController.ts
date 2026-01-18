import type { Request, Response } from "express";
import { Category } from "../models/categoryModel.js";

export const categoryController = async (req: Request, res: Response) => {
    try {
        const category = await Category.create(req.body);
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