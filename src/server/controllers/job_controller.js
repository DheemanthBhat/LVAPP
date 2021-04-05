const jobManager = require('../managers/job_manager');
const helper = require('../utils/helper');

async function listAll(req, res) {
  try {
    const parameters = {};

    // req.body cleansing.
    if (helper.isNotEmpty(req.body.searchText)) {
      parameters.searchText = req.body.searchText.toString().trim();
    }

    if (helper.isNotEmpty(req.body.jobType)) {
      parameters.jobType = req.body.jobType;
    }

    if (helper.isNotEmpty(req.body.locationText)) {
      parameters.locationText = req.body.locationText.toString().trim();
    }

    if (helper.isNotEmpty(req.body.experience)) {
      parameters.experience = parseInt(req.body.experience, 10);
    }

    const jobs = await jobManager.listAll(parameters);

    let message = 'Job list fetched successfully';

    if (helper.isEmpty(jobs)) {
      message = 'Empty job list is empty.';
    }

    res.status(200).json({ message, jobs });
  } catch (error) {
    console.log('ERROR: JOB CONTROLLER');
    console.log(error);
    res.status(500).json({ error: 'Internal server error!' });
  }
}

module.exports = {
  listAll
};
