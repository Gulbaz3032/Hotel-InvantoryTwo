import type { Types } from "mongoose";
import { Stock } from "../models/stockTransictionModel.js";

export const calculateStock = async (itemId: Types.ObjectId) => {
    const transactions  = await Stock.find({ itemId });

    let stock = 0;

    for(const tx of transactions) {
        if(tx.type === "IN") stock += tx.quantity;
        if(tx.type === "OUT") stock -= tx.quantity;
    }

    return stock
}