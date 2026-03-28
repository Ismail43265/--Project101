const express = require("express");
const dotenv = require("dotenv");
const connectToDb = require("./DB/db");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

// ✅ CORS FIRST
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ✅ cookie parser
app.use(cookieParser());

// ✅ body parser
app.use(express.json());

connectToDb();
app.get('/', (req,res)=>{
    res.send("Hello world");
})

app.use('/users', userRoutes);



module.exports = app;
