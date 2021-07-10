// controllers
const homePage = require("../controllers/homepagecontroller");
const admin    = require("../controllers/adminController");
// middlewares

const authenticate = require("../middlewares/userAuthentication");
const adminAuth = require("../middlewares/adminAuth");

const passport = require("passport");

function routes(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/google/auth/redirect",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  app.get("/",authenticate,homePage().homePage)
  // admin routes

  app.get("/admin/add-instruments",adminAuth,admin().adminPage)
  app.post("/admin/add-instruments",adminAuth,admin().addInstruments)
  // global route

  app.get("/login",homePage().loginPage);
  app.get("/auth/google/logout",authenticate,homePage().userLogout)
}

module.exports = routes;
