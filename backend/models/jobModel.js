const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobLink: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  postingDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  companyLogo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
