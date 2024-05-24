import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useUser } from "../auth/AuthContext";

const JobRole = () => {
  const [interestedFields, setInterestedFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    // console.log(userDetails.firstTime, user);

    if (userDetails?.firstTime === false) {
      navigate("/");
    }
  }, []);

  const handleAddInterestedField = () => {
    if (!interestedFields.includes(selectedField)) {
      setInterestedFields([...interestedFields, selectedField]);
      setSelectedField("");
    }
  };

  const handleRemoveInterestedField = (field) => {
    setInterestedFields(interestedFields.filter((f) => f !== field));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = {
    // interestedFields,
    // };
    // console.log(formData);

    const userDetails = JSON.parse(localStorage.getItem("user"));
    console.log(userDetails);

    const email = userDetails.email;

    fetch(`http://localhost:3000/api/user/update-interested-fields`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ interestedFields, email }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.acknowledged === true) {
          // alert('Preferences Saved!!!');
          setInterestedFields([]);
          setSelectedField("");

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userDetails,
              interestedFields,
            })
          );

          navigate("/");
        }
        // reset();
      });
  };

  return (
    <div
      className="container flex flex-col items-center h-screen px-4 mx-auto max-w-screen-2xl xl:px-24"
      style={{
        backgroundImage: `url("/images/iconBackground.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-8 text-2xl mt-28">Preferred Job Role</div>
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">
            <label className="block mt-8 mb-4 text-lg">Interested Fields</label>
            <div className="flex items-center">
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="create-job-input"
              >
                <option value="">Select an interest</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Developer">Developer</option>
                <option value="Engineer">Engineer</option>
                <option value="Solution Architect">Solution Architect</option>
                <option value="System Engineer">System Engineer</option>
                <option value="Technical Lead">Technical Lead</option>
                <option value="Application Architect">
                  Application Architect
                </option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
              <button
                type="button"
                onClick={handleAddInterestedField}
                className="px-2 py-1 ml-2 text-white rounded bg-theme"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {interestedFields.map((field) => (
                <div
                  key={field}
                  className="flex items-center px-2 py-1 mt-2 mr-2 bg-gray-200 rounded-lg"
                >
                  <span className="mr-2">{field}</span>
                  <FaTimes
                    onClick={() => handleRemoveInterestedField(field)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="block px-8 py-2 mt-8 font-semibold text-white rounded-sm cursor-pointer bg-theme"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobRole;
