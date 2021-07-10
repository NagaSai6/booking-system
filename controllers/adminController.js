const Instrument = require("../models/instrument");


function adminController(){
  return {
    adminPage(req,res){
      res.render("add-instruments")
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





  

    }

    } 
} 

module.exports = adminController;