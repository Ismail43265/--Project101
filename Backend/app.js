const express=require("express");
const dotenv=require("dotenv");
const connectToDb=require("./DB/db");
const userRoutes=require("./routes/user.routes")

const app=express();
dotenv.config();

connectToDb();
app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Hello world");
})

app.use('/users', userRoutes);



module.exports = app;
