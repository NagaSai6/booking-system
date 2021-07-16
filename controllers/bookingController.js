const Booking = require("../models/booking");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);
const tdc = require("./timeAndDateController");

function bookingController() {
  return {
    async bookInstrument(req, res) {
      //   console.log(req.body);
      let instrumentId = req.body._id;
      let category = req.body.category;
      let instrumentName = req.body.instrumentName;
      let userName = req.user.customerName;
      let userMail = req.user.gmail;
        
      let convertedStartTime = tdc().convertToMilliSeconds(req.body.queryStart);
      let startTimeInTwelveHourFormat = tdc().twelvehourFormat(req.body.queryStart);
      let convertedEndTime = tdc().convertToMilliSeconds(req.body.queryEnd);
      let convertedDate = tdc().formatDate(req.body.queryDate);
      let endTimeInTwelveHourFormat = tdc().twelvehourFormat(req.body.queryEnd);
      // console.log("convertedStartDate:"+ typeof(convertedDate));

      let cD = tdc().extractDate(convertedDate);
      // console.log(cD);
      let endDate = tdc().findEndDate(convertedStartTime,convertedEndTime,convertedDate);
    
      // console.log("convertedEndDate:"+ typeof(endDate));
      let eD =  tdc().extractDate(endDate)
      if (convertedEndTime - convertedStartTime <= 0) {
        convertedEndTime = tdc().modifyEndTime(convertedEndTime);
      }


      let conflictBookings = await Booking.find({
        category: category,
        startDate: convertedDate,
        instrumentId: instrumentId,
      })
        .where("startTime")
        .lt(convertedEndTime)
        .where("endTime")
        .gt(convertedStartTime)
        .exec();

      if (conflictBookings.length === 0) {
        let newBooking = new Booking({
          instrumentId: instrumentId,
          userId: req.user._id,
          category: category,
          instrumentName: instrumentName,
          userName: userName,
          userMail: userMail,
          startDate: convertedDate,
          startTime: convertedStartTime,
          endDate : endDate,
          endTime: convertedEndTime   
        });

        newBooking.save().then(async (newBooking) => {
          await Booking.populate(
            newBooking,
            { path: "instrumentId" },
            (err, bookedInstrument) => {
              Booking.populate(
                newBooking,
                { path: "userId" },
                (err, result) => {
                  let mailOptions = {
                    to: userMail,
                    from: process.env.SENDER_EMAIL,
                    templateId: "d-3c9c6086be994a2b91b6c71a50d31ac2",
                    subject: "Booking Confirmed",
                    dynamic_template_data: {
                      bookingId: newBooking._id,
                      bookedUser: userName,
                      bookedInstrument: instrumentName,
                      bookingStartDate : cD,
                      bookingEndDate : eD,
                      bookingStartTime:startTimeInTwelveHourFormat ,
                      bookingEndTime : endTimeInTwelveHourFormat
                    }
                  };
                  sgMail.send(mailOptions,(err,result)=>{
                    if(err){
                      console.log(err);
                    }
                  });
                  return res.json({ message: "Successfully Booked" });
                }
              );
            }
          );
        });
      } else {
        return res.json({ message: "oops,this item has just booked now" });
      }
    },
    // end of bookInstrument Method
  };
  // end of return
}

module.exports = bookingController;
