const Category = require("../models/category");

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
  };
}

module.exports = homePageController;
