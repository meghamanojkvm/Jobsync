import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

const ProfilePage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestedFields, setInterestedFields] = useState([]);
  const [selectedField, setSelectedField] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    console.log(userDetails);

    if (userDetails !== null) {
      const { email, username, interestedFields, phone } =
        JSON.parse(userDetails);

      setEmail(email);
      setInterestedFields(interestedFields);
      setName(username);
      setPhone(phone);
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddInterestedField = () => {
    if (!interestedFields.includes(selectedField)) {
      setInterestedFields([...interestedFields, selectedField]);
      setSelectedField("");
    }
  };

  const handleRemoveInterestedField = (field) => {
    setInterestedFields(interestedFields.filter((f) => f !== field));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      phone,
      interestedFields,
      // photo,
    };
    console.log(formData);

    fetch("http://localhost:3000/api/user/update-profile", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          localStorage.setItem("user", JSON.stringify(formData));
        }
        // reset();
      });

  };

  return (
    <div
      className="container flex flex-col items-center px-4 mx-auto max-w-screen-2xl xl:px-24"
      style={{
        backgroundImage: `url("/images/iconBackground1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      <div className="mt-8 mb-8 text-2xl text-gray-750">Profile Page</div>
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full">

          </div>

          <div className="w-full">
            <label className="block mt-8 mb-4 text-lg">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={handleNameChange}
              className="create-job-input"
            />
          </div>
          <div className="w-full">
            <label className="block mt-8 mb-4 text-lg">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              className="create-job-input"
            />
          </div>
          <div className="w-full">
            <label className="block mt-8 mb-4 text-lg">Phone</label>
            <input
              type="text"
              placeholder="Your Phone"
              value={phone}
              onChange={handlePhoneChange}
              className="create-job-input"
            />
          </div>
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

export default ProfilePage;
