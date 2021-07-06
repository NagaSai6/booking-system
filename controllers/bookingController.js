const Instrument = require("../models/instrument")

function bookingController(){
    return{
        bookingPage(req,res){
          Instrument.findOne({"_id":req.params.token},(err,itemToBeBooked)=>{
              res.render("booking",{itemToBeBooked})
          })
        }
    }
}


module.exports = bookingController