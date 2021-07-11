import axios from "axios";

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
  dateFormat:"dd-mm-yy",
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

   let queryObject = {
     queryCategory :queryCategory,
     queryDate : queryDate ,
     queryStart : queryStart,
     queryEnd : queryEnd
   }

   axios.post("/user/check-availability",queryObject).then(res=>{
     let data = JSON.parse(res.data.message);
     console.log(data);
     let element = document.getElementById('attach-available-items');
     while(element.firstChild){
         element.removeChild(element.firstChild) ;
     }
  
     let parentDiv = document.getElementById("attach-available-items");
     for(let i=0;i<data.length;i++){
       let divElement = document.createElement("div");
       let anchorElement = document.createElement("a");
       anchorElement.role ="button";
       anchorElement.setAttribute("data-instrument",JSON.stringify(data[i]));
       anchorElement.className="btn btn-md btn-success";
       anchorElement.href ="/user/book-instrument/"+data[i]._id;
       anchorElement.innerHTML = data[i].instrumentName;
       divElement.className ="col my-2";
       divElement.appendChild(anchorElement);
       parentDiv.appendChild(divElement);
     };
     let target = $("#attach-available-items");
     if (target.length) {
      $('html,body').animate({
          scrollTop: target.offset().top
      }, 1000);
      return false;
  }
   })
 
  }

 
  


  // <div class="col my-2">
  //       <a role="button" class="btn btn-md btn-success" href="http://">combiflash 203</a>
  //      </div>
