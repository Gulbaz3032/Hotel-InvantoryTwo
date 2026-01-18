import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
dotenv.config();
const app = express();

const port = process.env.PORT as string;
dbConnection();




app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
});