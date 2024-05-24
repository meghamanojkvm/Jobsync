import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';

import Banner from '../components/Banner';
import Card from '../components/card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const FindJobs = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    // fetch('jobs.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setJobs(data);
    //     setIsLoading(false);
    //   });

    fetch(`http://localhost:3000/api/job/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // console.log(jobs);

  const [query, setQuery] = useState('');
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //------------ radio filtering ----------------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main functions
  const filteredData = (jobs, seLected, query) => {
    // setCurrentPage(1);
    let filteredJobs = jobs;
    console.log(jobs);

    //filtered Input items
    if (query) {
      filteredJobs = filteredItems;
    }

    //catergory filtering
    if (seLected) {
      console.log(new Date(seLected));

      if (!isNaN(new Date(seLected))) {
        filteredJobs = filteredJobs.filter(
          ({ jobLocation, postingDate, companyName }, index) => {
            let date;

            // if (isNaN(moment(postingDate).toDate())) {
            date = moment(postingDate, 'DD/MM/YYYY').toDate();
            // } else {
            //   date = moment(postingDate).toDate();
            // }
            // console.log(
            //   index,
            //   date,
            //   new Date(date),
            //   new Date(moment(seLected).toDate()),
            //   new Date(date) >= new Date(moment(seLected).toDate()) &&
            //     new Date(date) <= new Date()
            // );
            // console.log(postingDate, moment(postingDate).toDate());
            // console.log moment(dateString, "DD/MM/YYYY", true).toDate();
            return (
              jobLocation.toLowerCase() === seLected.toLowerCase() ||
              new Date(date) >= new Date(moment(seLected).toDate()) ||
              companyName.toLowerCase() === seLected.toLowerCase() ||
              jobLocation.toLowerCase().includes(seLected.toLowerCase())
            );
          }
        );
      } else {
        filteredJobs = filteredJobs.filter(
          ({ jobLocation, postingDate, companyName }) =>
            jobLocation.toLowerCase() === seLected.toLowerCase() ||
            postingDate >= seLected ||
            companyName.toLowerCase() === seLected.toLowerCase() ||
            jobLocation.toLowerCase().includes(seLected.toLowerCase())
        );
      }
      console.log(filteredJobs);
    }

    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => (
      <Card
        key={i}
        data={data}
      />
    ));
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner
        query={query}
        handLeInputChange={handleInputChange}
      />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="p-4 bg-white rounded">
          <Sidebar
            handLeChange={handleChange}
            /* handLeClick={handleClick} */
          />
        </div>

        {/*job cards */}
        <div className="col-span-2 p-4 bg-white rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading.....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="mb-2 text-lg font-bold ">{result.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}

          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabLed={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{' '}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabLed={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : (
            ''
          )}
        </div>

        {/* Right side */}
        <div className="p-4 bg-white rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
