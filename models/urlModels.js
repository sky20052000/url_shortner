const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
        shortId:{
            type:String,
            required:true,
            unique:true
        },
        originalUrl:{
            type:String,
            required:true,
        },

        clickCount:[
            {
                timeStamp:{
                    type:Date
                }
            }
        ]

},{timestamps:true});


module.exports = new mongoose.model("Url", urlSchema);