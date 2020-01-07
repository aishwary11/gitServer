var mongoose = require('mongoose');
let userSchema = mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  }

}, {
  timestamps: {
    createdAt: 'createdAt',
    lastUpdated: 'lastUpdated'
  }
});

module.exports = mongoose.model('employees', userSchema);