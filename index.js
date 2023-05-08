const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 7000;
const expresslayout = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_startgy");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const custumMware = require("./config/middlware_custom");

app.use(express.urlencoded());

app.use(cookieParser());

//Calling static for use
app.use(express.static("./assets"));
app.use("/uploads",express.static(__dirname + "/uploads"))


//Calling express layout before routes
app.use(expresslayout);

//Extracting style and script from sub pages to layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


//Setup our view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Mongo store is use to store the cookie in the db
app.use(
  session({
    name: "codeal",
    //TODO change the secreate before the deployement on the server
    secret: "somethingblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect mongodb setup Ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(custumMware.setFlash);

// Calling routes
app.use("/", require("./routes"));

//Updating on the port
app.listen(port, (err) => {
  if (err) {
    console.log(`Error while running on the port :${err}`);
    return;
  }
  console.log(`Great your server is up on the port no : ${port}`);
});
