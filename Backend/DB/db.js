const mongoose=require("mongoose");

const connectToDb= async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("mongoose connected");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports =connectToDb;