require('dotenv').config();

const nodemailer = require('nodemailer');

const sendReminderEmail = async (filteredJobs) => {
  console.log('send email');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  filteredJobs.forEach(async (job) => {
    const { jobTitle, yourEmail, companyName, interviewtDate } = job;

    const mailOptions = {
      from: {
        name: 'JobSync',
        address: process.env.EMAIL,
      },
      to: yourEmail, // list of receivers
      subject: 'Interview Reminder: Hope you are ready ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `
      <p>Hello! </p>
      <br/>
      <h4>Your have an Interview coming in 5 days:</h4>
      
      <p><b>Company:</b>  ${companyName} </p> 
      
      <p><b>Job Title:</b> ${jobTitle}</p>
      
      <p><b>Interview Date:</b> ${interviewtDate}</p>
      
      <br/>
      <p>All the very best for your interview!</p>
      <br/>
      <p>Best Regards,</p>
      <p>JobSync</p>
      `, // html body
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Emails Sent!');
    } catch (error) {
      console.error(error);
    }
  });
};

module.exports = sendReminderEmail;
