const Booking = require("../models/booking");
const Instrument = require("../models/instrument");
const moment = require("moment");

function bookingController(){
  return {
   async checkAvailability(req, res) {
      let queryData = req.body;
      // moment is depricated, has to replace with alternatives
      let extractDate = moment(
        queryData.queryDate,
        "DD-MM-YYYY",
        true
      ).format();
    //   console.log(extractDate);
      let exactStartTime = queryData.queryStart;
      let extractEndTime = queryData.queryEnd;
      let convertedStartTime =
        Number(exactStartTime.split(":")[0]) * 60 +
        Number(exactStartTime.split(":")[1]) * 1000;


      let convertedEndTime =
        Number(extractEndTime.split(":")[0]) * 60 +
        Number(extractEndTime.split(":")[1]) * 1000;

      var category = queryData.queryCategory ;


      let conflictBookings = await Booking.find({"category":category})
      .where('startTime').lt(convertedEndTime)
      .where('endTime').gt(convertedStartTime)
      .exec()
      if(conflictBookings.length === 0){
          console.log(category);
       await Instrument.find({"category":category},(err,resultItems)=>{
        //    console.log(resultItems);
              return res.json({"message":JSON.stringify(resultItems)})
          }).then(result=>{
              console.log(result);
          }).catch(err=>{
              console.log(err);
          })
      }
    },
  };
}

module.exports = bookingController;
