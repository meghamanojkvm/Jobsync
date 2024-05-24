const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applySchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  yourEmail: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  interviewtDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Applied', applySchema);
