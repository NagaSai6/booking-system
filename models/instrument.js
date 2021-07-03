const mongoose = require('mongoose');


const instrumentSchema = new mongoose.Schema({
    nameOfInstrument:{
        type:String,
        required:true
    },
    nunmberOfInstruments:{
        type:Number,
        required:true
    },
    instrumentImageSourceLink:{
        type:String,
        required:true
    } 
},{timestamps:true})

const Instrument = mongoose.model(instrumentSchema) ;

exports.module = Instrument 
