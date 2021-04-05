const JobModel = require('../models/job_schema');

function listAll(filter, project) {
  return JobModel.find(filter, project).sort({ updatedAt: -1 });
}

module.exports = {
  listAll
};
