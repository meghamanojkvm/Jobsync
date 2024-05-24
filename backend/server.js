require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

const parseDbForReminder = require("./emailAutomation/parseDbForReminder");

const applyRoutes = require("./routes/apply");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/apply", applyRoutes);
app.use("/api/job", jobRoutes);

cron.schedule(
  "22 12 * * *",
  () => {
    // console.log("Running a task every miday at 12 A.M.");
    parseDbForReminder();
  },
  {
    timezone: "Asia/Kolkata",
  }
);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
