const dotenv = require("dotenv");
dotenv.config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const http = require("http");
const app = require("./app");
const connectToDb = require("./DB/db");
const { initSocket } = require("./Socket.cjs");

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        console.log("DB_CONNECT exists:", !!process.env.DB_CONNECT);
        console.log("DB host:", process.env.DB_CONNECT?.split("@")[1]?.split("/")[0]);

        await connectToDb();

        const server = http.createServer(app);
        initSocket(server);

        server.listen(port, () => {
            console.log(`Server listening at ${port}`);
        });
    } catch (error) {
        console.error("Server failed:", error);
        process.exit(1);
    }
};

startServer();