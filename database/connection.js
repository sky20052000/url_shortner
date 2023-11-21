require("dotenv").config();
const mongoose = require("mongoose");

const Connection = async(req,res)=>{
         const con = await mongoose.connect(process.env.Mongo_url,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
         });
          if(!con){
            console.log("Mongoose connection failed!");
          }else{
            console.log("Mongoose connection Success!");
          }
}

module.exports = Connection;