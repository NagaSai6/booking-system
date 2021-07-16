const Instrument = require("../models/instrument");
const Booking = require("../models/booking");
const moment = require("moment");
function homepagecontroller(){
  return {
    homePage(req,res){
      Instrument.distinct("category",(err,result)=>{
         res.render("home",{result})
      })
    },
    loginPage(req,res){
      res.render("sign")
    },
    userLogout(req,res){
      
      req.logout();
      // req.session = null ;
      res.redirect("/")
    },
  async  myBooking(req,res){
         let bookings = await Booking.find({"userId":req.user._id},
         null,{sort:{"createdAt": -1}});
         res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
         res.render("user/my-bookings",{book:bookings,moment:moment});
    }
  }
}





module.exports = homepagecontroller;