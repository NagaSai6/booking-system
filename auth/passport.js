const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user");

function init(passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      (req, token, refreshToken, profile, done) => {
        // console.log(profile);
        // asynchronous
        process.nextTick(function () {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ googleId: profile.id }, function (err, user) {
              if (err) return done(err);

              if (user) {
                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.googleToken) {
                  user.googleToken = token;
                  user.customerName = profile.displayName;
                  user.gmail = profile.emails[0].value; // pull the first email
                  // user.gmail_verified = profile.emails[0].verified ;
                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();
                newUser.googleId = profile.id;
                newUser.googleToken = token;
                newUser.customerName = profile.displayName;
                newUser.gmail = profile.emails[0].value; // pull the first email
                //   user.gmail_verified = profile.emails[0].verified ;
                newUser.save(function (err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            });
          } else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session
            user.googleId = profile.id;
            user.googleToken = token;
            user.customerName = profile.displayName;
            user.gmail = profile.emails[0].value; // pull the first email
            // user.gmail_verified = profile.emails[0].verified ;
            user.save(function (err) {
              if (err) throw err;
              return done(null, user);
            });
          }
        });
      }
    )
  );
}

module.exports = init;
