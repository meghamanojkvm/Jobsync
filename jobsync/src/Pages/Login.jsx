import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const user = useUser();

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    // console.log(response);
    const json = await response.json();

    if (!response.ok) {
      alert("Login Failed");
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      user.setAuthenticated(true);

      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{
        backgroundImage: `url("/images/login.png")`,
        backgroundSize: "auto 100%", // Adjust background size here
        backgroundRepeat: "no-repeat", // Prevent repeating the background image
        backgroundColor: "#fafafa",
      }}
    >
      <div
        className="w-full max-w-md p-8 text-purple-900 bg-grey-100 border border-gray-200 rounded-lg shadow-xl wrapper backdrop-blur-md"
        style={{ marginLeft: "40vw", marginTop: "-10vh" }}
      >
        <form action="" className="w-full " onSubmit={loginUser}>
          <h1 className="mb-6 text-4xl font-bold text-center">Login</h1>{" "}
          <div className="relative flex items-center w-full mb-6 shadow-md input-box rounded-3xl">
            <FaUser className="absolute text-xl transform -translate-y-1/2 icon left-4 top-1/2" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full px-12 py-3 text-gray-700 placeholder-gray-400 transition duration-300 bg-transparent border border-gray-100 outline-none rounded-3xl focus:border-theme hover:border-purple-700"
            />
          </div>
          <div className="relative flex items-center w-full mb-6 shadow-md input-box rounded-3xl">
            <FaLock className="absolute text-xl transform -translate-y-1/2 icon left-4 top-1/2" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full px-12 py-3 text-gray-700 placeholder-gray-400 transition duration-300 bg-transparent border border-gray-100 outline-none rounded-3xl focus:border-theme hover:border-purple-700"
            />
          </div>
          {/* <div className="flex justify-between mb-2 text-sm remember-forgot">
            {' '}
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />{' '}
              Remember me
            </label>
            <a
              href="#"
              className="text-theme hover:underline"
            >
              Forgot Password
            </a>
          </div> */}
          <button
            type="submit"
            className="w-full h-12 text-base font-bold text-gray-600 bg-white border border-gray-100 rounded-full shadow-md hover:text-white hover:bg-theme"
          >
            {" "}
            Login
          </button>
          <div className="mt-4 text-sm text-center register-link">
            {" "}
            <p>
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold text-purple-theme hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
