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
    passport.authenticate("windowslive", {
      scope: [
        "openid",
        "profile",
      ],
    })
  );
  app.get(
    "/microsoft/auth/redirect",
    passport.authenticate("windowslive", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  app.get("/", authenticate, homePage().homePage);
  // admin routes
  app.get("/admin/manage-users", adminAuth, admin().manageUsers);
  app.get("/admin/manage-bookings", adminAuth, admin().manageBookings);
  app.get("/admin/add-instruments", adminAuth, admin().adminPage);
  app.post("/admin/add-instruments", adminAuth, admin().addInstruments);
  app.get("/admin/manage-instruments", adminAuth, admin().manageInstruments);
  app.post("/admin/manage-instruments", adminAuth, admin().editInstruments);
  app.post("/admin/delete-instruments", adminAuth, admin().deleteInstruments);
  app.post(
    "/admin/add-single-instrument",
    adminAuth,
    admin().addSingleInstrument
  );
  app.post(
    "/admin/update-single-instrument",
    adminAuth,
    admin().updateSingleInstrument
  );
  app.post("/admin/remove-admin", adminAuth, admin().removeAdmin);
  app.post("/admin/make-admin", adminAuth, admin().makeAdmin);

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
  app.get("/user/my-bookings", authenticate, homePage().myBooking);
}

module.exports = routes;
