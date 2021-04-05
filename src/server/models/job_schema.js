const mongoose = require('mongoose');

const definition = {
  skills: [String],
  position: String,
  location: String,
  company: String,
  logo: String,
  type: String,
  experience: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

const options = { collection: 'JobList' };

const JobListSchema = new mongoose.Schema(definition, options);

// Create text index for search.
JobListSchema.index({
  position: 'text',
  location: 'text',
  company: 'text',
  skills: 'text'
});

module.exports = mongoose.model('JobList', JobListSchema);
