const moment = require("moment");
function timeAndDateController() {
  return {
    convertToMilliSeconds(num) {
      return Number(num.split(":")[0]) * 60 + Number(num.split(":")[1]) * 1000;
    },
    formatDate(date) {
      return moment.utc(date, "DD-MM-YYYY", true).format();
    },
    findEndDate(st, et, sd) {
      // console.log(typeof(sd));
      // console.log(st);
      // console.log(et);
      if (et - st < 0) {
        //    console.log("main loop entered");
        Date.prototype.addDays = function (days) {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        const date = new Date(sd);
        // console.log(typeof(date));
        return moment(date.addDays(1), "DD-MM-YYYY", true).format();
      } else {
        //    console.log("Failed");
        return sd;
      }
    },
    modifyEndTime(et) {
      // this method modifies end time relative to 00:00 of user selected date
      // used when end time crosses 24 hrs limit (next day)
      let modifiedEndTime = et + 24 * 60;
      return modifiedEndTime;
    },
    extractDate(cd) {
      return moment.utc(cd).format("DD-MM-YYYY");
    },
    twelvehourFormat(q) {
      return moment(q, "HHmm").format("hh:mm A");
    },
  };
}

module.exports = timeAndDateController;
