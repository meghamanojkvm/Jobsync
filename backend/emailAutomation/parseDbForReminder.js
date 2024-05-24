const Applied = require('../models/applyModel');
const sendReminderEmail = require('./sendReminderEmail');

const jobs = [
  {
    jobTitle: 'job',
    yourEmail: 'gurjotsingh4398@gmail.com',
    companyName: 'amazon',
    interviewtDate: '2024-03-08',
    __v: 0,
  },
  {
    jobTitle: 'job',
    yourEmail: 'gurjotsingh4398@gmail.com',
    companyName: 'amazon',
    interviewtDate: '2024-02-23',
    __v: 0,
  },
  {
    jobTitle: 'Web Developer',
    yourEmail: 'harnoor144kaur@gmail.com',
    companyName: 'Microsoft',
    interviewtDate: '2024-02-15',
    __v: 0,
  },
  {
    jobTitle: 'software engineer ',
    yourEmail: 'harnoor144kaur@gmail.com',
    companyName: 'Amazon',
    interviewtDate: '2024-03-05',
    __v: 0,
  },
];

const parseDbForReminder = async () => {
  const jobs = await Applied.find({});
  // console.log(jobs);

  const today = new Date();
  const fiveDaysFromToday = new Date(today);
  fiveDaysFromToday.setDate(today.getDate() + 5);

  const filteredJobs = jobs.filter((job) => {
    const interviewDate = new Date(job.interviewtDate);

    return (
      interviewDate.getDate() === fiveDaysFromToday.getDate() &&
      interviewDate.getMonth() === fiveDaysFromToday.getMonth()
    );
  });

  console.log('filteredJobs:', filteredJobs);

  // const emails = filteredJobs.map((job) => {yourEmail: job.yourEmail});

  await sendReminderEmail(filteredJobs);
};

module.exports = parseDbForReminder;
