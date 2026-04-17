const express = require("express");

const connectToDb = require("./DB/db");

// Api routes
const userRoutes = require("./routes/user.routes");
const notificationRoutes= require("./routes/notification.routes");
const groupRoutes= require("./routes/group.routes");


const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
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

app.use("/api/group",groupRoutes);



module.exports = app;
