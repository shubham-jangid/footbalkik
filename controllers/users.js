const { users } = require("./../server");
const passport = require("passport");

const Signup = (req, res) => {
  return res.render("signup", {
    signup: "signup page"
  });
};

const Login = (req, res) => {
  return res.render("login", {
    signup: "login page"
  });
};
const homePage = (req, res) => {
  return res.render("home");
};

const postSignup = passport.authenticate("local-signup", {
  successRedirect: "/home",
  failureRedirect: "/signup",
  failureFlash: true
});

users.get("/", Login);

users.get("/signup", Signup);
users.post("/signup", postSignup);
users.get("/home", homePage);
