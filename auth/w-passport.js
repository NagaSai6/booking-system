const passport = require("passport");
const outLookStrategy = require("passport-outlook");
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
    new outLookStrategy(
      {
        clientID: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        callbackURL: process.env.OUTLOOK_CLIENT_CALLBACK,
        passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      (req, token, refreshToken, profile, done) => {
        // console.log(profile);
        // asynchronous
        process.nextTick(function () {
          // check if the user is already logged in
          if (!req.user) {
            User.findOne({ msId: profile.id }, function (err, user) {
              if (err) return done(err);

              if (user) {
                // if there is a user id already but no token (user was linked at one point and then removed)
                if (!user.msToken) {
                  user.msToken = token;
                  user.msUserName = profile.displayName;
                  user.outLookmail = profile.emails[0].value; // pull the first email
                  // user.gmail_verified = profile.emails[0].verified ;
                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();
                newUser.msId = profile.id;
                newUser.msToken = token;
                newUser.msUserName = profile.displayName;
                newUser.outLookmail = profile.emails[0].value; // pull the first email
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
            user.msId = profile.id;
            user.msToken = token;
            user.msUserName = profile.displayName;
            user.outLookMail = profile.emails[0].value; // pull the first email
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
