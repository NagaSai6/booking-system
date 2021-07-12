const mongoose = require("mongoose");
const Instrument = require("../models/instrument");
const User = require("../models/user");

const bookingSchema = new mongoose.Schema({
    instrumentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Instrument",
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:String,
        required:true

    },
    instrumentName:{
        type:String,
        required:true
    },
    userName :{
        type:String,
        required:true
    },
    userMail:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    startTime:{
        type:Number,
        required:true
    },
    endTime:{
        type:Number,
        required:true
    }
},{timestamps:true});

const Booking = new mongoose.model("Booking",bookingSchema);

module.exports = Booking ;

