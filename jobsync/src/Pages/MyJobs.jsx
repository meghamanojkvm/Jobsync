import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../auth/AuthContext";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // set current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch(`http://localhost:3000/api/apply/MyJobs/harnoor144kaur@gmail.com`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setJobs(data);
  //       setIsLoading(false);
  //     });
  // }, [searchText]);

  //  pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  //next btn & previous btn
  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const handleSearch = () => {
  //   const filter = jobs.filter(
  //     (job) =>
  //       job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  //   );
  //   // console.log(filter);
  //   setJobs(filter);
  //   setIsLoading(false);
  // };

  const handleDelete = (id) => {
    // console.log(id);
    fetch(`http://localhost:3000/api/apply/job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Job deleted Successfully!!!");
        }
      });
  };

  //   console.log(searchText);
  return (
    <div className="container px-4 mx-auto mb-32 max-w-screen-2xl xl:px-24">
      <div className="flex flex-col justify-center my-job-container">
        <h1 className="p-4 mt-12 text-2xl text-center">Applied Jobs</h1>
        <div className="p-2 text-center search-box inline-block">
          <Link
            to="/Calender"
            className="px-3 py-1 mr-1 text-xs font-bold text-white uppercase rounded outline-none bg-theme active:bg-indigo-600 focus:outline-none"
          >
            Switch to Calendar View
          </Link>
        </div>

        <div className="p-2 text-center search-box">
          {/* <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            name="search"
            id="search"
            className="w-full py-2 pl-3 mb-4 border focus:outline-none lg:w-6/12"
          />
          <button
            className="px-8 py-2 mb-4 font-semibold text-white rounded-sm bg-theme"
            onClick={handleSearch}
          >
            Search
          </button> */}
        </div>
      </div>

      {/* table */}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full px-4 mx-auto mt-5 mb-12 xl:w-8/12 xl:mb-0">
          <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg ">
            <div className="px-4 py-3 mb-0 border-0 rounded-t">
              <div className="flex flex-wrap items-center">
                <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                  <h3 className="text-base font-semibold text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                  <Link to="/UploadJob">
                    <button
                      className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded outline-none bg-theme active:bg-indigo-600 focus:outline-none"
                      type="button"
                    >
                      Upload Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      JOB TITLE
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      COMPANY NAME
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      INTERVIEW DATE
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      EDIT
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                      DELETE
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <div className="flex items-center justify-center h-20">
                    <p>loading...........</p>
                  </div>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="p-4 px-6 text-xs text-left border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="p-4 px-6 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap ">
                          {job.jobTitle}
                        </td>
                        <td className="p-4 px-6 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">
                          {job.companyName}
                        </td>
                        <td className="p-4 px-2 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">
                          <i className="mr-4 fas fa-arrow-up text-emerald-500"></i>
                          {job.interviewtDate}
                        </td>
                        <td className="p-4 px-2 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                          <i className="mr-4 fas fa-arrow-up text-emerald-500"></i>
                          <button>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="p-4 px-2 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">
                          <i className="mr-4 fas fa-arrow-up text-emerald-500"></i>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="px-6 py-2 text-white bg-red-700 rounded-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center mb-8 space-x-8 text-black">
          {currentPage > 1 && (
            <button className="hover:underline" onClick={prevPage}>
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button className="hover:underline" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyJobs;
