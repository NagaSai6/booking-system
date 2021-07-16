const Instrument = require("../models/instrument");
const User = require("../models/user");
function adminController() {
  return {
    adminPage(req, res) {
      res.render("admin/add-instruments");
    },
    addInstruments(req, res) {
      // console.log(req.body);
      const dataArray = Object.keys(req.body).map((i) => req.body[i]);
      // check whether category exists

      let categoryName = dataArray[0].category;

      Instrument.find({ "category": categoryName }, (err, result) => {
        if (result.length != 0) {
          return res.json({ success: "category already exist" });
        } else {
          Instrument.insertMany(dataArray, { ordered: true })
            .then((result) => {
              return res.json({ success: "successfully added" });
            })
            .catch((err) => {
              return res.json({ success: "Failed to add" });
            });
        }
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    manageInstruments(req, res) {
      Instrument.distinct("category", (err, result) => {
        res.render("admin/manage-instruments", { result });
      })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editInstruments(req, res) {
      // res.render("admin/edit-instruments")
      let searchQuery = req.body.searchInput.toLowerCase();
      Instrument.find({ "category": searchQuery }, (err, editableItems) => {
        if (editableItems.length === 0) {
          req.flash("info", "Category does not exist");
          res.redirect("/admin/manage-instruments");
        } else {
          res.render("admin/edit-instruments", { editableItems });
        }
      })
        .then((success) => {
          console.log(success);
        })
        .catch((err) => {
          req.flash(
            "info",
            "Something went Wrong on server side try again later"
          );
          res.redirect("/admin/manage-instruments");
        });
    },
    async deleteInstruments(req, res) {
      let instrumentExist = await Instrument.find({ "_id": req.body.id }).exec();
      console.log(instrumentExist);
      if (instrumentExist.length != 0) {
        Instrument.deleteOne({ "_id": req.body.id }, (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ message: "failed to delete" });
          }
        })
          .then((suc) => {
            // console.log(suc);
            return res.json({ message: "successfully deleted" });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ message: "failed to delete" });
          });
      } else {
        return res.json({ message: "Item does not exist or already deleted" });
      }
    },
    async addSingleInstrument(req, res) {
      const dataOfSingleInstrument = Object.keys(req.body).map(
        (i) => req.body[i]
      );
      console.log(dataOfSingleInstrument);
      let insertDocument = {};
      insertDocument.category = dataOfSingleInstrument[0];
      insertDocument.image = dataOfSingleInstrument[1];
      insertDocument.instrumentName = dataOfSingleInstrument[2];
      console.log(insertDocument);

      const singleInstrument = new Instrument(insertDocument);
      singleInstrument
        .save()
        .then((success) => {
          res.json({ message: "success" });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "failed" });
        });
    },
  async updateSingleInstrument(req, res) {
      const updateData = Object.keys(req.body).map((i) => req.body[i]);
      let updateDocument = {};
      let id = updateData[3];
      // console.log(typeof(id));
      updateDocument.image = updateData[1];
      updateDocument.instrumentName = updateData[2];
      // console.log(updateDocument);

     await Instrument.findByIdAndUpdate({"_id":id},{$set:updateDocument},{new:true},(err,result)=>{
        if(err){
          console.log(err);
          return res.json({'message':'failed'})
        }else{
          return res.json({'message':'success'})
        }

      }).then(success=>{
        console.log(success);
      })

    },
  async  manageUsers(req,res){
        await User.find({},(err,users)=>{
          if(err){
            console.log(err);
            return res.json({'message':'Failed to get users'})
          }
         return res.render('admin/manage-users',{users})
        })
    },
  async  removeAdmin(req,res){
   let adminUsers = await  User.find({"role":"admin"}).exec()
     if(adminUsers.length >1){
       User.findByIdAndUpdate({_id:req.body.userId},{$set:{"role":"FTE"}},(err,result)=>{
         if(err){
           console.log(err);
           req.flash("info","Some thing went wrong ,Try again Later");
           res.redirect("/admin/manage-users")
         }else{
           res.redirect("/admin/manage-users")
         }
       })
     }else{
      req.flash("info","Atleast one admin should exist");
      res.redirect("/admin/manage-users")
     }
    },
    makeAdmin(req,res){
      console.log(req.body.userId);
      User.findByIdAndUpdate({"_id":req.body.userId},{$set:{"role":"admin"}},(err,result)=>{
        
        if(err){
          console.log(err);
          req.flash("info","Some thing went wrong ,Try again Later");
          return res.redirect("/admin/manage-users")
        }else{
          // console.log(result)
          return res.redirect("/admin/manage-users")
        }
      }).then(result=>{
        // console.log(result);
      })

    }
  };
}

module.exports = adminController;
