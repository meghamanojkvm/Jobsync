import React from "react";
import { useForm } from "react-hook-form";

const UploadJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    fetch("http://localhost:3000/api/apply/post-job", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result._id) {
          alert("Job Posted Successfully!!!");
        }
        // reset();
      });
  };

  return (
    <div
      className="container flex flex-col items-center h-screen px-4 mx-auto max-w-screen-2xl xl:px-24"
      style={{
        backgroundImage: `url("/images/iconBackground1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {" "}
      {/* Heading above the form */}
      <div className="mt-12 mb-8 text-2xl">Upload the Applied Job</div>
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 w-full md:w-1/2">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* 1st */}
          <div className="w-full lg:2-1/2">
            <label className="block mb-4 text-lg ">Job Title</label>
            <input
              type="text"
              placeholder={"Web Developer"}
              {...register("jobTitle")}
              className="create-job-input"
            />
          </div>
          {/* 2nd */}
          <div className="w-full lg:2-1/2">
            <label className="block mt-8 mb-4 text-lg">Company Name</label>
            <input
              type="text"
              placeholder="Microsoft"
              {...register("companyName")}
              className="create-job-input"
            />
          </div>
          {/* 3rd*/}
          <div className="w-full lg:2-1/2">
            <label className="block mt-8 mb-4 text-lg">Interview Date</label>
            <input
              type="date"
              placeholder="Ex-2023-10-28"
              {...register("interviewtDate")}
              className="create-job-input"
            />
          </div>
          {/* last */}
          <div className="w-full lg:2-1/2">
            <label className="block mt-8 mb-4 text-lg ">Email Id</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("yourEmail")}
              className="create-job-input"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              className="block px-8 py-2 mt-8 font-semibold text-white rounded-sm cursor-pointer bg-theme"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadJob;
