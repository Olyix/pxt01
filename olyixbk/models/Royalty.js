const mongoose = require('mongoose');

const RoyaltySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // additional fields here
});

module.exports = mongoose.model('Royalty', RoyaltySchema);
