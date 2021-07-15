const Booking = require("../models/booking");
const Instrument = require("../models/instrument");
const tdc = require("./timeAndDateController");

function availabilityController(){
  return {
   async checkAvailability(req, res) {
      let queryData = req.body;
      let extractDate = tdc().formatDate(queryData.queryDate);
    //   console.log(extractDate);
      let convertedStartTime = tdc().convertToMilliSeconds(queryData.queryStart);
      let convertedEndTime = tdc().convertToMilliSeconds(queryData.queryEnd);
      

      var category = queryData.queryCategory ;
      let isCategoryExist = await Instrument.find({"category":category}).exec();
      if(isCategoryExist.length === 0){
       return res.json({'error':'category not found'}) ;
      }

      let conflictBookings = await Booking.find({"category":category,"date":extractDate})
      .where('startTime').lt(convertedEndTime)
      .where('endTime').gt(convertedStartTime)
      .exec()
      // console.log(conflictBookings);
      if(conflictBookings.length === 0){
          // console.log(category);
       await Instrument.find({"category":category},(err,resultItems)=>{
        //    console.log(resultItems);
              return res.json({"message":JSON.stringify(resultItems)})
          }).then(result=>{
              // console.log(result);
          }).catch(err=>{
              console.log(err);
          })
      }else{
        let requiredInstruments = await Instrument.find({"category":category}).exec();
        
        for(let i=0;i<conflictBookings.length;i++){
          console.log("entered Outer For LOop");
          for(let j=0;j<requiredInstruments.length;j++){
            console.log("entered inner For LOop");
            // console.log(typeof(conflictBookings[0].instrumentId));
            // console.log(typeof(requiredInstruments[2]._id));

            if(JSON.stringify(conflictBookings[i].instrumentId) === JSON.stringify(requiredInstruments[j]._id)){
               
              requiredInstruments.splice(j,1)
              // console.log(requiredInstruments);
              // console.log("instrument Break");

            }
          }
        }

        return res.json({"message":JSON.stringify(requiredInstruments)});
      
      }
      //  console.log("this is a break");
       
    },
  };
}

module.exports = availabilityController;
