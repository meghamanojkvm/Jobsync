import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

import { useUser } from "../auth/AuthContext";

import "react-calendar/dist/Calendar.css";
import "./CalendarContainer.css"; // Import your custom CSS file

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    setIsLoading(true);

    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (userDetails && userDetails.email !== "") {
      if (!user.authenticated) {
        user.setAuthenticated(true);
      }

      const email = userDetails.email;

      fetch(`http://localhost:3000/api/apply/MyJobs/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setJobs(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // const show = ({ date, view }) => {
  //   const job = jobs.find((job) => {
  //     // console.log(
  //     //   date,
  //     //   job.interviewtDate,
  //     //   new Date(job.interviewtDate).getDate() === new Date(date).getDate()
  //     // );

  //     return (
  //       new Date(job.interviewtDate).getDate() === new Date(date).getDate() &&
  //       new Date(job.interviewtDate).getMonth() === new Date(date).getMonth()
  //     );
  //   });

  //   console.log(job);
  //   if (job) {
  //     return <div className="job-tile">{job.jobTitle}</div>;
  //   }

  //   return null;
  // };

  const applyBackground = ({ date, view }) => {
    const job = jobs.find((job) => {
      return (
        new Date(job.interviewtDate).getDate() === new Date(date).getDate() &&
        new Date(job.interviewtDate).getMonth() === new Date(date).getMonth()
      );
    });

    if (job) {
      if (
        new Date(job.interviewtDate).getDate() === new Date().getDate() &&
        new Date(job.interviewtDate).getMonth() === new Date().getMonth()
      ) {
        return "Calendarbackground";
      }
      if (new Date(job.interviewtDate) < new Date()) {
        return "CalendarbackgroundPast";
      }
      return "Calendarbackground";
    }

    return null;
  };

  return (
    <div className="CalendarContainer">
      <div className="flex flex-col justify-center my-job-container">
        <h1 className="p-4 mt-12 text-2xl text-center">Applied Jobs</h1>
        <div className="p-2 text-center search-box inline-block">
          <Link
            to="/MyJobs"
            className="px-3 py-1 mr-1 text-xs font-bold text-white uppercase rounded outline-none bg-theme active:bg-indigo-600 focus:outline-none"
          >
            Switch to Table View
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <p>loading...........</p>
        </div>
      ) : (
        <div className="CalendarContent" style={{ marginBottom: "40px" }}>
          <div>
            <Calendar
              className="custom-calendar"
              onChange={setDate}
              value={date}
              tileClassName={applyBackground}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
