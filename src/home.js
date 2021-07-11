
$( function() {
  let datepickerOptions ={
    dateFormat:"dd/mm/yy",
    minDate : new Date(),
    maxDate : "+1m"
  }
    $( "#datepicker" ).datepicker(datepickerOptions);
  } );




