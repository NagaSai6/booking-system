import Swal from 'sweetalert2';
import axios from 'axios';

$("#goBackButton").on("click",()=>{
    window.location.assign("/admin/manage-instruments")
});

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
                text:'Refresh the page to see the changes',
                title: 'Successfully Deleted',
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}