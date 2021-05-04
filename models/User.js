let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var User = mongoose.model('user', new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String},
}));

// UserSchema.methods.comparePassWord = function (enteredPassword, callback) {
//   if (enteredPassword == this.password) {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

module.exports = User;
