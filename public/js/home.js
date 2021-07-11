/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
$(function () {
  var starttimeOptions = {
    vibrate: true,
    donetext: 'Done',
    placement: 'bottom',
    "default": 'now',
    align: 'right',
    autoclose: true
  };
  var endtimeOptions = {
    vibrate: true,
    donetext: 'Done',
    placement: 'bottom',
    align: 'left',
    autoclose: true
  };
  var datepickerOptions = {
    dateFormat: "dd/mm/yy",
    minDate: new Date(),
    maxDate: "+1m"
  };
  $("#datepicker").datepicker(datepickerOptions);
  $("#endtime").clockpicker(endtimeOptions);
  $('#starttime').clockpicker(starttimeOptions);
});
$("#availabilityCheckForm").on("submit", function (e) {
  e.preventDefault();
  collectDataFromForm();
});

function collectDataFromForm() {
  var queryCategory = $("#searchInput").val();
  var queryDate = $("#datepicker").val();
  var queryStart = $("#starttime").val();
  var queryEnd = $("#endtime").val();
}
/******/ })()
;