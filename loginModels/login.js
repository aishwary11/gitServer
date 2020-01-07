var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let loginSchema = mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  }
});
loginSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}
loginSchema.methods.isValid = function (hashedPassword) {
  return bcrypt.compareSync(hashedPassword, this.password)
}

module.exports = mongoose.model('login', loginSchema);