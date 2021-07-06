const Category = require("../models/category");
const Instrument = require("../models/instrument") ;

function homePageController() {
  return {
    homePage(req, res) {
      // res.render("home");
      Category.find({"category":"Instruments"},(err,category)=>{
        if(err){
          console.log(err);
        }else{
          return res.render("home",{category})
        }
      })
  
    },
    login(req, res) {
      res.render("sign");
    },
    logOut(req, res) {
      req.logout();
      return res.redirect("/");
    },
    instruments(req,res){
      console.log(req.params.name);
      console.log(req.params.token);
      Instrument.find({"categoryId":req.params.token},(err,instrument)=>{
        res.render("instrument",{instrument})
      })
    }
  };
}

module.exports = homePageController;
