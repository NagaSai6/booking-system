$( function() {
let starttimeOptions ={
  vibrate:true,
  donetext:'Done',
  placement:'bottom',
  default:'now',
  align:'right',
  autoclose:true
};
let endtimeOptions = { 
  vibrate:true,
  donetext:'Done',
  placement:'bottom',
  align:'left',
  autoclose:true
};
let datepickerOptions ={
  dateFormat:"dd/mm/yy",
  minDate : new Date(),
  maxDate : "+1m"
};

  $( "#datepicker" ).datepicker(datepickerOptions);
    $("#endtime").clockpicker(endtimeOptions);
    $('#starttime').clockpicker(starttimeOptions);

  } );

  $("#availabilityCheckForm").on("submit",(e)=>{
      e.preventDefault();
      collectDataFromForm();
  })

  function collectDataFromForm(){
   let queryCategory = $("#searchInput").val();
   let queryDate = $("#datepicker").val();
   let queryStart = $("#starttime").val();
   let queryEnd = $("#endtime").val();
 
  }

 
  



