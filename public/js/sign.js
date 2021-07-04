function triggerGoogleAuth() {
  return (location.href = "/auth/google");
}

let validateButton = document.getElementById("validateButton");

validateButton.addEventListener("click", () => {
  document.getElementById("validateButton").innerHTML ="Validating.."
  let url = document.getElementById("inputImageSourceLink").value;
  if (typeof(url)==="string") {
   checkImage(url)
  }
});

function checkImage(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = function () {
    status = request.status;
    if (request.status == 200) {
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
     return toastr["success"]("Image Url Is Valid", "Success")
    } else {
      document.getElementById("validateButton").innerHTML ="Validate"
      console.log("image doesn't exist");
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
      };
      return toastr["error"]("Please check your URL", "Invalid Image link")
    }
  };
}
