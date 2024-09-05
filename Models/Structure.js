const mongoose = require("mongoose");

const URLschema = new mongoose.Schema(
 {
    originalurl:{
        type:String,
        require:true
    },
    hash:{
        type:String,
        required:true,
        unique:true,
    },
    clickCount:{
        type:Number,
        default:0,
    },
    maxClicks:{
        type:Number,
        default:null,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        default:null,
    }
 });

 module.exports = mongoose.model("url", URLschema);

