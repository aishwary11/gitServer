var mongoose = require('mongoose');

let imgSchema = mongoose.Schema({
  filename: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model('images', imgSchema);