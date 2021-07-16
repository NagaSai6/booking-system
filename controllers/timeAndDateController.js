const moment = require("moment");
// import {moment} from 'moment';
function timeAndDateController() {
  return {
    convertToMilliSeconds(num) {
      return Number(num.split(":")[0]) * 60 + Number(num.split(":")[1]) * 1000;
    },
    formatDate(date) {
      return moment.utc(date, "DD-MM-YYYY", true).format();
    },
    findEndDate(d) {},
    modifyEndtTime(et) {
      // this method modifies end time relative to 00:00 of user selected date
      // used when end time crosses 24 hrs limit (next day)
      let modifiedEndTime = et + 24 * 60;
      return modifiedEndTime;
    },
  };
}

module.exports = timeAndDateController;
