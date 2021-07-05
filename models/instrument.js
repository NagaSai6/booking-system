const mongoose = require("mongoose");
const Category = require("../models/category") ;
const instrumentSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    instrumentName:{
        type:String,
        required:true
    },
    instrumentImage:{
        type:String,
        required:true
    }
},{timestamps:true}) ;

const Instrument = new mongoose.model("Instrument",instrumentSchema);

module.exports = Instrument