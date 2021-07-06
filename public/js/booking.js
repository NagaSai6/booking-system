document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    let options = {format:"yyyy/mm/dd"}
    var instances = M.Datepicker.init(elems, options);
    // start time 
    var startTimeElems =document.querySelectorAll('#start_time');
    let startTimeOptions = {vibrate:true}
    var startTimeInstances = M.Timepicker.init(startTimeElems,startTimeOptions)
    // End Time 
    var endTimeElems =document.querySelectorAll('#end_time');
    let endTimeOptions = {vibrate:true}
    var endTimeInstances = M.Timepicker.init(endTimeElems,endTimeOptions)
  });

function goback(){
    window.history.back();
}

