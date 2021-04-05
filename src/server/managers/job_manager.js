const JobModel = require('../models/job_schema');

function listAll() {
  return JobModel.find();
}

module.exports = {
  listAll
};
