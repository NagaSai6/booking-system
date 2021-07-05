var instrumentImageSourceLink = document.getElementById(
  "inputImageSourceLink"
).value;
// grab the submit button
let submitButton = document.getElementById("submitButton");
// now add event listener to this button to prevent form submission
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
 
  // now trigger another function which makes js object with form input values
  triggerAjax();
});

// function createObject() {
//   // create a object with form input data
//   let formData = {};
//   formData.instrumentImageSourceLink = document.getElementById(
//     "inputImageSourceLink"
//   ).value;
//   formData.instrumentName = document.getElementById(
//     "inputInstrumentName"
//   ).value;
//   formData.instrumentNumber = document.getElementById(
//     "inputNumberOfInstruments"
//   ).value;
//   // now we will pass this created object to server via ajax
//   triggerAjax(formData);
// }


function triggerAjax(formData){

  let instrumentName = document.getElementById(
    "inputInstrumentName"
  ).value;
  let instrumentNumber = document.getElementById(
    "inputNumberOfInstruments"
  ).value;
  const xhr = new XMLHttpRequest() ;
  const url ="/admin/add-instruments";
  const params = `imageLink=${encodeURIComponent(instrumentImageSourceLink)}&instrumentNaam=${encodeURIComponent(instrumentName)}&instrumentNumber=${encodeURIComponent(instrumentNumber)}` ;
  console.log(params);
  xhr.open("POST",url,true) ;
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

 
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        let response = JSON.parse(xhr.responseText) ;
        console.log(response);
        if(response.invalidImageUrl === "error"){
         return alert("Invalid Image Url")
        }
        if(response.dataSuccesfullySaved === "success-data"){
          toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr["success"]("Instrument Data added / updated", "Successfully Saved")
          setTimeout(function(){
           let url = "/";
          return window.location.assign(url)
          },5000)
        }
      }else{
        alert("Internal server error")
      }
    }
  }
  xhr.send(params) ;
}