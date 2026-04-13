const http=require("http");
const app=require("./app");
const port= process.env.PORT || 3000;
const {initSocket}=require("./Socket.cjs");
console.log(typeof require);

const server=http.createServer(app);
initSocket(server);
server.listen(port,()=>{
    console.log(`Server listning at ${port}`);
})