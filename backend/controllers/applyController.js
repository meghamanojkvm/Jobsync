const Applied = require('../models/applyModel');
const mongoose = require('mongoose');

const postJob = async (req, res) => {
  console.log('abc');
  const body = req.body;
  console.log(body);
  // body.createAt = new Date();

  try {
    const result = await Applied.create(body);

    return res.status(200).send(result);
  } catch {
    return res.status(404).send({
      message: 'can not insert! try again later',
      status: false,
    });
  }
};

// const allJobs = async (req, res) => {
//   const { email } = req.body;
//   const jobs = await Applied.find({ email });
//   console.log(jobs);
//   res.status(200).json(jobs);
// };

const allJobsId = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Applied.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    res.status(200).send(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const myJobsEmail = async (req, res) => {
  console.log(req.params.email);
  const jobs = await Applied.find({
    yourEmail: req.params.email,
  });
  console.log(jobs);

  res.send(jobs);
};

const jobId = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const result = await Applied.deleteOne(filter);
  console.log(result);
  res.send(result);
};

const UpdateJobId = async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      ...jobData,
    },
  };

  const result = await Applied.updateOne(filter, updateDoc, options);
  res.send(result);
};

module.exports = {
  postJob,
  // allJobs,
  allJobsId,
  myJobsEmail,
  jobId,
  UpdateJobId,
};
