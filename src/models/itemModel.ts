import { model, Schema, Types } from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true
    },
    minStockLevel: {
        type: Number,
        required: true,
        default: 0,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    }
}, {
    timestamps: true
});

export const Item = model("Item", itemSchema);
