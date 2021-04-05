const os = require('os');
const express = require('express');

const router = express.Router();

const jonController = require('../controllers/job_controller');

router.get('/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username });
});

async function listJobs(req, res) {
  jonController.listAll(req, res);
}

router.get('/jobs', listJobs);

module.exports = router;
