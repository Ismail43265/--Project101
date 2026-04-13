const {Server}=require("socket.io");
const cors=require("cors");

let io;

const initSocket= (server)=>{
    io= new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials: true
        }
    });

    io.on("connection", (socket)=>{
        console.log("User connected:", socket.id)

        socket.on("join", (userId)=>{
            socket.join(userId);
        });

        socket.on("disconnect" ,()=>{
            console.log("User disconnected");
        });
    });
};

const getIO = () => io;
module.exports = { initSocket, getIO };