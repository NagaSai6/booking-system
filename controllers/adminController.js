const mongoose = require("mongoose");
const Category = require("../models/category");
const Instrument = require("../models/instrument");
const validUrl = require("valid-url");

function adminController() {
  return {
    addInstruments(req, res) {
      res.render("add-instruments");
    },
    async adminAddInstruments(req, res) {
      let imageLink = req.body.imageLink;
      let instrumentName = req.body.instrumentNaam.toLowerCase();
      let instrumentNumber = parseInt(req.body.instrumentNumber);

      // find and delete if already exists

      try {
        await Category.deleteMany({ categoryName: instrumentName });
        Instrument.deleteMany({ instrumentName: instrumentName });
      } catch (e) {
        console.log(e);
      }
      try {
      await  Instrument.deleteMany({ instrumentName: instrumentName });
      } catch (e) {
        console.log(e);
      }

      // imageUrl validation
      if (validUrl.isUri(imageLink)) {
        const category = new Category({
          categoryName: instrumentName,
          availableInstrumentsInCategory: instrumentNumber,
          categoryImage: imageLink,
        });
        category
          .save()
          .then((category) => {
            for (let i = 0; i < instrumentNumber; i++) {
              const instrument = new Instrument({
                categoryId: category._id,
                instrumentName: category.categoryName,
                instrumentImage: category.categoryImage,
              });
              console.log(instrument.instrumentName);
              instrument.save().then((instrument) => {
                Instrument.populate(
                  instrument,
                  { path: "categoryId" },
                  (err, savedInstrument) => {
                    console.log(savedInstrument);
                  }
                );
              });
            }
            return res.json({ dataSuccesfullySaved: "success-data" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.json({ invalidImageUrl: "error" });
      }
    },
  };
}

module.exports = adminController;
