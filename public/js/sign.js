function triggerGoogleAuth() {
  return (location.href = "/auth/google");
}
// grab the submit button
let submitButton = document.getElementById("submitButton");
// now add event listener to this button to prevent form submission
submitButton.addEventListener("click",function(event){
  event.preventDefault();
})




