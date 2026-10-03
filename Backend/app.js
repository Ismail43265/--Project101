const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Api routes
const userRoutes = require("./routes/user.routes");
const notificationRoutes = require("./routes/notification.routes");
const groupRoutes = require("./routes/group.routes");
const expenceRoutes = require("./routes/expence.routes");
const settlementRoutes = require("./routes/settlements.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/health", (req, res)=>{
    res.status(200).json({
        status: "ok",
        service: "money_country-api",
        timestamp: new Date().toISOString()
    });
})

app.use("/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/expence", expenceRoutes);
app.use("/api/settlements", settlementRoutes);

module.exports = app;