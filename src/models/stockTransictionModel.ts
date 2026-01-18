import { model, Schema, Types } from "mongoose";

const stockTransactionSchema = new Schema(
    {
        itemId: {
            type: Types.ObjectId,
            ref: "Item",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true
        },
        note: {
            type: String,
        }

    }, 
    {
        timestamps: true
    }
);

export const Stock = model("Stock", stockTransactionSchema);