
import axios from "axios";
import toastr from "toastr";

document
  .getElementById("continueButton")
  .addEventListener("click", function () {
    let noOfInstruments = document.getElementById("numberOfInstruments").value;
    let categoryName = document.getElementById("categoryName").value.toLowerCase();
    let imageLink = document.getElementById("inputImageSourceLink").value;
    let element = document.getElementById("generatedInputFields");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    generateInputs(noOfInstruments);
  });

function generateInputs(num) {
  let divElement = document.getElementById("generatedInputFields");
  let button = document.createElement("button");
  button.innerHTML = "Submit Data";
  button.className = "btn btn-lg btn-outline-primary align-items-center";
  button.type = "submit";
  button.id = "submit-data-btn";
  let divForButton = document.createElement("div");
  divForButton.className = "submit-data";
  divForButton.appendChild(button);
  for (let i = 1; i <= parseInt(num); i++) {
    let inputElement = document.createElement("input");
    let divElement1 = document.createElement("div");
    divElement1.className = "col-md-6 dynamicDivs my-2";
    inputElement.setAttribute = "required";
    inputElement.required = true;
    inputElement.type = "text";
    inputElement.id = "instrument" + i;
    inputElement.placeholder = "Instrument" + " " + i + " " + "name";
    inputElement.className = "form-control";
    divElement1.appendChild(inputElement);
    divElement.appendChild(divElement1);
  }
  divElement.appendChild(divForButton);
}

document.getElementById("dynamic-form-inputs").addEventListener("submit",function(e){
 e.preventDefault();
 var noOfInstruments = document.getElementById("numberOfInstruments").value;
 var categoryName = document.getElementById("categoryName").value;
 var imageLink = document.getElementById("inputImageSourceLink").value;
 formatData(noOfInstruments,categoryName,imageLink);
})




function formatData(n,c,i){
  // console.log("formatData function is called");
  let dataArray = [];
  for (let a = 1; a <= parseInt(n); a++) {
    let dataObject = {};
    let param = "instrument" + a;
    let inputData = document.getElementById(param).value.toLowerCase();
    dataObject.category = c.toLowerCase();
    dataObject.instrumentName = inputData;
    dataObject.image = i;
    // console.log(dataObject);
    dataArray.push(dataObject);
    dataObject=null;
    param = null;
    inputData=null;
  }
  manageData(dataArray);
}

function manageData(data){
 let dataFormatted = toObject(data);
 axios.post("/admin/add-instruments",dataFormatted).then(res=>{
   if(res.data.success == "successfully added"){
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.newestOnTop = true;
    toastr.options.preventDuplicates = true;
    toastr.options.timeOut = 5000;
    toastr.success('Success', 'Instrument Added Succesfully');
    return setTimeout(()=>{
       window.location.assign("/")
    },5000)
   }
   if(res.data.success =="Failed to add"){
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.newestOnTop = true;
    toastr.options.preventDuplicates = true;
    toastr.options.timeOut = 5000;
   return toastr.error('Error', 'Failed to Instrument');
   }
   if(res.data.success=="category already exist"){
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.newestOnTop = true;
    toastr.options.preventDuplicates = true;
    toastr.options.timeOut = 7000;
    toastr.options.positionClass = "toast-top-center";
   return toastr.error('Error', 'Category Already Exists. Try Updating');
   }
 })
}

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
  return rv;
}

