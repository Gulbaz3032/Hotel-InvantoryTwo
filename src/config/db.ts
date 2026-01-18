import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
    const port = process.env.MONGO_URI as string
    try {
        await mongoose.connect(port)
        console.log("Database is connected")
    } catch (error) {
        console.log("Failed to connect Database", error)
    }
}