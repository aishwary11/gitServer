var mongoose = require('mongoose');
let loginSchema = mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('login', loginSchema);