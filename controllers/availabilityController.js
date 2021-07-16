const Booking = require("../models/booking");
const Instrument = require("../models/instrument");
const tdc = require("./timeAndDateController");

function availabilityController() {
  return {
    async checkAvailability(req, res) {
      let queryData = req.body;
      let extractDate = tdc().formatDate(queryData.queryDate);
      let convertedStartTime = tdc().convertToMilliSeconds(
        queryData.queryStart
      );
      let convertedEndTime = tdc().convertToMilliSeconds(queryData.queryEnd);

      var category = queryData.queryCategory;
      let isCategoryExist = await Instrument.find({
        category: category,
      }).exec();
      if (isCategoryExist.length === 0) {
        return res.json({ error: "category not found" });
      }
      if (convertedEndTime - convertedStartTime < 0) {
        convertedEndTime = tdc().modifyEndTime(convertedEndTime);
      }
      let conflictBookings = await Booking.find({
        category: category,
        startDate: extractDate,
      })
        .where("startTime")
        .lt(convertedEndTime)
        .where("endTime")
        .gt(convertedStartTime)
        .exec();
      if (conflictBookings.length === 0) {
        await Instrument.find({ category: category }, (err, resultItems) => {
          return res.json({ message: JSON.stringify(resultItems) });
        })
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        let requiredInstruments = await Instrument.find({
          category: category,
        }).exec();
        for (let i = 0; i < conflictBookings.length; i++) {
          for (let j = 0; j < requiredInstruments.length; j++) {
            if (
              JSON.stringify(conflictBookings[i].instrumentId) ===
              JSON.stringify(requiredInstruments[j]._id)
            ) {
              requiredInstruments.splice(j, 1);
            }
          }
        }
        return res.json({ message: JSON.stringify(requiredInstruments) });
      }
    },
  };
}

module.exports = availabilityController;
