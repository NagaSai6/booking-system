// controllers 

const homePage = require("../controllers/homepagecontroller")

// middlewares

const authenticate = require("../middlewares/userAuthentication");
const passport = require("passport")


function routes(app) {
app.get("/",authenticate,homePage().homePage)
app.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }))
app.get("/google/auth/redirect",passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
}))
app.get("/login",homePage().login)
}

module.exports = routes 
