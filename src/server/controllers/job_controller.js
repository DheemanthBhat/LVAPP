const jobManager = require('../managers/job_manager');
const helper = require('../utils/helper');

async function listAll(req, res) {
  try {
    const jobs = await jobManager.listAll();

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
