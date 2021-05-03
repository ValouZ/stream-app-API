let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.methods.comparePassWord = function (enteredPassword, callback) {
  if (enteredPassword == this.password) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = mongoose.model("User", UserSchema);
