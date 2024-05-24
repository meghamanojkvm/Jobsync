import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaUser, FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/AuthContext";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const user = useUser();

  const signupUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${firstname} ${lastname}`,
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      alert("SignUp Failed");
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      user.setAuthenticated(true);

      navigate("/JobRole");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("/images/signup.png")`,
        backgroundSize: "auto 80%", // Adjust background size here
        backgroundRepeat: "no-repeat", // Prevent repeating the background image
        backgroundColor: "#fafafa",
        backgroundPosition: "20% 20%",
      }}
    >
      <div
        className="flex items-center justify-center h-screen"
        style={{ marginLeft: "50vw", marginTop: "-10vh" }}
      >
        <div className="p-8 text-purple-900 border-2 rounded-lg shadow-lg bg-grey-100 signup-container border-opacity-20 backdrop-blur-md w-96">
          <h2 className="mb-8 text-3xl font-bold text-center">Sign up</h2>
          <form className="signup-form" onSubmit={signupUser}>
            <div className="mb-6 form-group">
              <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
                <label
                  htmlFor="firstName"
                  className="icon"
                  style={{ paddingLeft: "1rem" }}
                >
                  <FaUser />
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  placeholder="First Name"
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
                />
              </div>
            </div>
            <div className="mb-6 form-group">
              <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
                <label
                  htmlFor="lastName"
                  className="icon"
                  style={{ paddingLeft: "1rem" }}
                >
                  <FaUser />
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
                />
              </div>
            </div>
            <div className="mb-6 form-group">
              <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
                <label
                  htmlFor="email"
                  className="icon"
                  style={{ paddingLeft: "1rem" }}
                >
                  <IoMail />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
                />
              </div>
            </div>
            {/* <div className="mb-6 form-group">
            <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
              <label
                htmlFor="role"
                className="icon"
                style={{ paddingLeft: "1rem" }}
              >
                <FiUserCheck />
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Your Preferred Role"
                className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
              />
            </div>
          </div> */}
            <div className="mb-6 form-group">
              <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
                <label
                  htmlFor="password"
                  className="icon"
                  style={{ paddingLeft: "1rem" }}
                >
                  <RiLockPasswordLine />
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Your Password"
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
                />
              </div>
            </div>
            {/* <div className="mb-6 form-group">
            <div className="relative flex items-center w-full transition duration-300 border border-gray-200 shadow-md input-box h-14 rounded-3xl hover:border-purple-900">
              <label
                htmlFor="confirmPassword"
                className="icon"
                style={{ paddingLeft: '1rem' }}
              >
                <RiLockPasswordLine />
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none rounded-3xl focus:border-theme"
              />
            </div>
          </div> */}
            <div className="mb-3 form-group">
              <button
                type="submit"
                className="w-full h-12 text-base font-bold text-gray-700 bg-white border border-gray-200 shadow-md rounded-3xl hover:text-white hover:bg-purple-900"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
