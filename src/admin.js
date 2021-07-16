import Swal from 'sweetalert2';
import axios from 'axios';

$("#goBackButton").on("click",()=>{
    window.location.assign("/admin/manage-instruments")
});

$("#AdminAddInstrument").on("click",async (e)=>{
    let addSingleInstrument = JSON.parse(e.currentTarget.dataset.addinstrument);
    const { value: formValues } = await Swal.fire({
        title: 'Instrument Name',
        html:
          `<input value="${addSingleInstrument.category}" disabled id="swal-input1" class="swal2-input">` +
          `<input value="${addSingleInstrument.image}" disabled id="swal-input2" class="swal2-input">` +
          `<input placeholder="instrumentName" id="swal-input3" class="swal2-input">`,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value
          ]
        }
      })
      if (formValues) {
       triggerAddSingleInstrument(JSON.stringify(formValues));
      }
})

$(".updateData").on("click",async (e)=>{
    let updateData =JSON.parse(e.currentTarget.dataset.update);
    console.log(updateData);
    const { value: formValues } = await Swal.fire({
        title: 'Update Instrument Details',
        html:
          `<input value="${updateData.category}" style="display:none;" id="swal-input1" class="swal2-input">` +
          `<input value="${updateData.image}"  id="swal-input2" class="swal2-input">` +
          `<input value="${updateData.instrumentName}" id="swal-input3" class="swal2-input">`+
          `<input value="${updateData._id}" style="display:none;" id="swal-input4" class="swal2-input">`,

        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value,
            document.getElementById('swal-input4').value
          ]
        }
      })
      if (formValues) {
          triggerUpdate(formValues);
      }
})



$(".deleteData").on("click",(e)=>{
  let extractedData =JSON.parse(e.currentTarget.dataset.delete);
  let id = extractedData._id;
   
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      sendDeleteRequest(id);
    }
  })
})

function sendDeleteRequest(id){
    let data = {};
    data.id = id;
    axios.post("/admin/delete-instruments",data).then(res=>{
        if(res.data.message === 'successfully deleted'){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){
                window.location.reload()
            },1500)

        }
    })
}





function triggerAddSingleInstrument(data){
    let FormattedData = toObject(JSON.parse(data));
    console.log(FormattedData);
   axios.post('/admin/add-single-instrument',FormattedData).then(res=>{
      if(res.data.message === 'success'){
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Added',
            timer:1500
          })
        return setTimeout(function(){
            window.location.reload()
        },1500)
      }else{
        return  Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Try again Later',
            timer:1500
          }) 
      }
      
   })
}

function triggerUpdate(data){
    let convertedData = toObject(data);
    axios.post("/admin/update-single-instrument",convertedData).then(res=>{
        console.log(res);
        if(res.data.message === 'success'){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Successfully Updated',
                timer:1500
              })
             return setTimeout(function(){
                window.location.reload()
            },1500)
          }
        if(res.data.message === 'failed'){
          return  Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Try again Later',
                timer:1500
              }) 
        }
         
    })
}




function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
  }