const Instrument = require("../models/instrument");


function adminController(){
  return {
    adminPage(req,res){
      res.render("admin/add-instruments")
    },
    addInstruments(req,res){
      // console.log(req.body);
      const dataArray = Object.keys(req.body).map(i => req.body[i]) ;
     // check whether category exists

    let  categoryName = dataArray[0].category;

    Instrument.find({"category":categoryName},(err,result)=>{
      if(result.length != 0){
        return res.json({"success":"category already exist"})
      }else{
        Instrument.insertMany(dataArray,{ordered:true}).then(result=>{
          return res.json({"success": "successfully added"})
        }).catch(err=>{
          return res.json({"success":"Failed to add"})
        })
      }
    }).then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log(err);
    })





  

    },
    manageInstruments(req,res){
      Instrument.distinct("category",(err,result)=>{
        res.render("admin/manage-instruments",{result})
      }).then(success=>{
        console.log(success);
      }).catch(err=>{
        console.log(err);
      })           
    },
    editInstruments(req,res){
      // res.render("admin/edit-instruments")
      let searchQuery = req.body.searchInput.toLowerCase();
      Instrument.find({"category":searchQuery},(err,editableItems)=>{
          if(editableItems.length === 0){
            req.flash("info","Category does not exist");
            res.redirect('/admin/manage-instruments');
          }else{
            res.render("admin/edit-instruments",{editableItems})
          }
      }).then(success=>{
        console.log(success);
      }).catch(err=>{
            req.flash("info","Something went Wrong on server side try again later");
            res.redirect('/admin/manage-instruments');
      })
    }

    } 
} 

module.exports = adminController;