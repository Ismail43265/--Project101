const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./DB/db");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const notificationRoutes= require("./routes/notification.routes");
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

connectToDb();
app.get('/', (req,res)=>{
    res.send("Hello world");
})

app.use('/users', userRoutes);

app.use("/api/notifications", notificationRoutes);



module.exports = app;
