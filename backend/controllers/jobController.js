const Job = require('../models/jobModel');
// const mongoose = require('mongoose');

const allJobs = async (req, res) => {
  const jobs = await Job.find();
  console.log(jobs);
  res.status(200).json(jobs);
};

const postJobs = async (req, res) => {
  const body = req.body;
  console.log(body);
  // body.createAt = new Date();

  try {
    const result = await Job.insertMany(body);
    console.log(result);

    return res.status(200).send({
      message: 'Jobs Uploaded',
    });
  } catch {
    return res.status(404).send({
      message: 'can not insert jobs! try again later',
      status: false,
    });
  }
};

// const allJobsAmazon = async (req, res) => {
//   const jobs = await Applied.find({
//     company: 'Amazon',
//   });

//   res.send(jobs);
// };

module.exports = {
  allJobs,
  postJobs,
};
