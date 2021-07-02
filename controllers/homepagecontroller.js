
function homePageController(){
    return {
        homePage(req,res){
            res.render("home")
        },
        login(req,res){
            res.render("sign")
        }
    }
}

module.exports=homePageController