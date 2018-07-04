require("./passport/passport-local");

const express = require("express");
const http = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("flash");
const passport = require("passport");

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/footballkiki");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);

const users = express.Router();

app.use("/", users);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(validator());
app.use(
  session({
    secret: "thisisasecretekey",
    resave: true,
    saveInitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

server.listen(3000, function() {
  console.log("listening to port 3000");
});

module.exports = { users };

require("./controllers/users");

// const container = require("./container");

// container.resolve(function(users) {
//   const app = SetupExpress();

//   function SetupExpress() {
//     const app = express();
//     const server = https.createServer(app);
//     server.listen(3000, function() {
//       console.log("listening to port 3000");
//     });
//     const router = require("express-promise-router");
//     users.SetRouting(router);

//     app.use(router);
//   }

//   function ConfigureExpress(app) {
//     app.use(express.static("public"));
//     app.set("view engine", "ejs");
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencode({ extended: true }));
//   }
// });

// module.exports = { users };
