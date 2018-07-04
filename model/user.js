const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  fullname: {
    type: String,
    require: true,
    default: ""
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    default: ""
  },
  userImage: {
    type: String,
    default: "default.png"
  },
  facebook: {
    type: String,
    default: ""
  },
  fbTokken: Array,
  google: {
    type: String,
    default: ""
  },
  googleToken: Array
});

userSchema.method.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.method.validUserPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
