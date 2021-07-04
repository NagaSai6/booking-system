function adminController(){
    return{
        addInstruments(req,res){
          res.render('add-instruments')
        }

    }
}

module.exports = adminController