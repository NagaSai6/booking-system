// controllers
const homePage = require("../controllers/homepagecontroller");
const admin = require("../controllers/adminController");
const availability = require("../controllers/availabilityController");
const booking = require("../controllers/bookingController");
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

  app.get("/", authenticate, homePage().homePage);
  // admin routes

  app.get("/admin/add-instruments", adminAuth, admin().adminPage);
  app.post("/admin/add-instruments", adminAuth, admin().addInstruments);
  app.get("/admin/manage-instruments",adminAuth,admin().manageInstruments);
  app.post("/admin/manage-instruments",adminAuth,admin().editInstruments);
  app.post("/admin/delete-instruments",adminAuth,admin().deleteInstruments);
  // global route

  app.get("/login", homePage().loginPage);
  app.get("/user/google/logout", authenticate, homePage().userLogout);

  // user routes
  app.post(
    "/user/check-availability",
    authenticate,
    availability().checkAvailability
  );
  app.post("/user/book-instrument", authenticate, booking().bookInstrument);
}

module.exports = routes;
