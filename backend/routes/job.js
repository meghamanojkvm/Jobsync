const express = require('express');
const { allJobs, postJobs } = require('../controllers/jobController');

const router = express.Router();

router.get('/all-jobs', allJobs);

router.post('/post-jobs', postJobs);

module.exports = router;
