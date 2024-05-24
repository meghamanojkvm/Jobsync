const express = require('express');
const {
  postJob,
  allJobs,
  allJobsId,
  myJobsEmail,
  jobId,
  UpdateJobId,
} = require('../controllers/applyController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
// router.use(requireAuth);

router.post('/post-job', postJob); // used in UploadJob.jsx

// router.get('/all-jobs', allJobs);

router.get('/all-jobs/:id', allJobsId); // used in Router.jsx

router.get('/MyJobs/:email', myJobsEmail); // used in MyJobs.jsx

router.delete('/job/:id', jobId); // used in MyJobs.jsx

router.patch('/update-job/:id', UpdateJobId); // used in UpdateJob.jsx

module.exports = router;
