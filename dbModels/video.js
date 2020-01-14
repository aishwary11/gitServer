var mongoose = require('mongoose');

let videoSchema = mongoose.Schema({
  originalname: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model('videos', videoSchema);