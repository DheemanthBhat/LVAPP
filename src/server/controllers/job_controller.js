const jobManager = require('../managers/job_manager');
const helper = require('../utils/helper');

async function listAll(req, res) {
  try {
    let filter = {};

    if (helper.isNotEmpty(req.body.searchText)) {
      filter = {
        $text: { $search: req.body.searchText.toString().trim() }
      };
    }

    if (helper.isNotEmpty(req.body.jobType)) {
      filter.type = { $in: req.body.jobType };
    }

    const jobs = await jobManager.listAll(filter);

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
