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

      let convertedStartTime =
        Number(req.body.queryStart.split(":")[0]) * 60 +
        Number(req.body.queryStart.split(":")[1]) * 1000;

      let convertedEndTime =
        Number(req.body.queryEnd.split(":")[0]) * 60 +
        Number(req.body.queryEnd.split(":")[1]) * 1000;

      let convertedDate = moment.utc(
        req.body.queryDate,
        "DD-MM-YYYY",
        true
      ).format();

      let conflictBookings = await Booking.find({
        "category": category,
        "date": convertedDate,
        "instrumentId": instrumentId,
      })
        .where("startTime")
        .lt(convertedEndTime)
        .where("endTime")
        .gt(convertedStartTime)
        .exec();

      if (conflictBookings.length === 0) {
        let newBooking = new Booking({
          instrumentId: instrumentId,
          category: category,
          userName: userName,
          userMail: userMail,
          date: convertedDate,
          startTime: convertedStartTime,
          endTime: convertedEndTime,
          userId: req.user._id,
          instrumentName: instrumentName,
        });

        newBooking.save().then(async (newBooking) => {
          await Booking.populate(newBooking, { path: "instrumentId" },(err,bookedInstrument)=>{
             Booking.populate(newBooking, { path: "userId" },(err,result)=>{
                 let mailOptions= {
                   to:userMail,
                   from:process.env.SENDER_EMAIL,
                   templateId:'d-3c9c6086be994a2b91b6c71a50d31ac2',
                   subject:"Booking Confirmed",
                   dynamic_template_data:{
                    bookingId : newBooking._id,
                    bookedUser : userName,
                    bookedInstrument :instrumentName
                  }
                 }
                 sgMail.send(mailOptions);
                return res.json({ message: "Successfully Booked" });
             });

          })
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
