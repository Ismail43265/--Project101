const express=require("express");
const dotenv=require("dotenv");
const connectToDb=require("./DB/db");

const app=express();
dotenv.config();

connectToDb();



export default app
