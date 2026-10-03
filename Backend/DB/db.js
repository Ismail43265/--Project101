const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            serverSelectionTimeoutMS: 15000,
        });

        console.log("mongoose connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

module.exports = connectToDb;