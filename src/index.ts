import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
dotenv.config();
const app = express();
app.use(express.json())

const port = process.env.PORT as string;
dbConnection();


app.use("/api/categories", categoryRoutes)
app.use("/api/items", itemRoutes)




app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
});