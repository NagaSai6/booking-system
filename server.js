require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const flash = require("express-flash");
const helmet = require("helmet");
const mongodb_store = require("connect-mongo");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

// connection to DB


mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Successfully Connected to MongoDB");
  });
mongoose.set("useCreateIndex", true);

var sess = {
  secret: [process.env.SECRET_SESSION,process.env.SECRET_SESSION1],
  resave: false,
  store: mongodb_store.create({
    mongoUrl: process.env.URL,
    autoRemove: "disabled",
    dbName: "bookingsDB",
    collectionName: "sessions",
  }),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 3,
  }
  // cookie valid for 3 hours
}

if(app.get('env')==="production"){
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true;
}

app.use(
  session(sess)
);
app.use(flash());
app.use(express.static("public"));
app.disable('x-powered-by');
app.use(helmet.xssFilter());

app.use(express.json());


app.use(
  express.urlencoded({
    extended: false,
  })
);





// configuring Passport

const passportInit = require("./auth/w-passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

require("./routes/routes")(app);

const server = app.listen(process.env.PORT || 7000, function () {
  console.log("Server is up on port 7000");
});
