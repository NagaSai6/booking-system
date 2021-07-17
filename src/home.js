import axios from "axios";
import Swal from "sweetalert2";

$(function () {
  let starttimeOptions = {
    vibrate: true,
    donetext: "Done",
    placement: "bottom",
    default: "now",
    align: "right",
    autoclose: true,
  };
  let endtimeOptions = {
    vibrate: true,
    donetext: "Done",
    placement: "bottom",
    align: "left",
    autoclose: true,
  };
  let datepickerOptions = {
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    maxDate: "+1m",
  };

  $("#datepicker").datepicker(datepickerOptions);
  $("#endtime").clockpicker(endtimeOptions);
  $("#starttime").clockpicker(starttimeOptions);
});

$("#availabilityCheckForm").on("submit", (e) => {
  e.preventDefault();
  let element = document.getElementById("attach-available-items");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  collectDataFromForm();
});

function collectDataFromForm() {
  window.queryCategory = $("#searchInput").val().toLowerCase();
  window.queryDate = $("#datepicker").val();
  window.queryStart = $("#starttime").val();
  window.queryEnd = $("#endtime").val();

  let queryObject = {
    queryCategory: queryCategory,
    queryDate: queryDate,
    queryStart: queryStart,
    queryEnd: queryEnd,
  };

  axios.post("/user/check-availability", queryObject).then((res) => {
    if (res.data.message) {
      let data = JSON.parse(res.data.message);
      console.log(data);

      let parentDiv = document.getElementById("attach-available-items");
      for (let i = 0; i < data.length; i++) {
        let divElement = document.createElement("div");
        let anchorElement = document.createElement("button");
        //  anchorElement.setAttribute("onclick",initBook(this));
        anchorElement.setAttribute("data-instrument", JSON.stringify(data[i]));
        anchorElement.className = "btn btn-md btn-success bookingBuuton";
        anchorElement.id = data[i].instrumentName;
        anchorElement.href = "#";
        anchorElement.innerHTML = data[i].instrumentName;
        divElement.className = "col my-2 instrument-div";
        divElement.appendChild(anchorElement);
        parentDiv.appendChild(divElement);
      }
      let target = $("#attach-available-items");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    } else {
      $("#errorMsg").html(res.data.error);
      return setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
}

$("#attach-available-items").on("click", "button", function (e) {
  let dataOfInstrument = JSON.parse(this.dataset.instrument);
  Swal.fire({
    icon: "warning",
    title: "Do You Want to Book?",
    // showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Yeah`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      initBook(dataOfInstrument, queryDate, queryStart, queryEnd);
    }
  });
});

function initBook(d, qd, qs, qe) {
  d.queryDate = qd;
  d.queryStart = qs;
  d.queryEnd = qe;

  //  console.log(d);
  axios.post("/user/book-instrument", d).then((res) => {
    let parsedResponse = res.data.message;
    console.log(parsedResponse);
    if (parsedResponse === "Successfully Booked") {
      Swal.fire({
        position: "End",
        icon: "success",
        title: "Successfully Booked",
        text: "Check Your Inbox",
        showConfirmButton: false,
        timer: 1500,
      });
      return setTimeout(() => {
        window.location.assign("/user/my-bookings");
      }, 1500);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops..",
        text: "You could have been faster",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}
