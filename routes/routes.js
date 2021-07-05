// controllers

const homePage = require("../controllers/homepagecontroller");
const admin = require("../controllers/adminController");
// middlewares

const authenticate = require("../middlewares/userAuthentication");
const adminAuth = require("../middlewares/adminAuth");

const passport = require("passport");

function routes(app) {
  app.get("/", authenticate, homePage().homePage);
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
  app.get("/login", homePage().login);
  app.get("/auth/google/logout", homePage().logOut);

  // admin routes

  app.get("/admin/add-instruments", adminAuth, admin().addInstruments);
  app.post("/admin/add-instruments",adminAuth,admin().adminAddInstruments);
}

module.exports = routes;
