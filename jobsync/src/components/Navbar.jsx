import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBarsStaggered, FaXmark, FaUser } from 'react-icons/fa6';
import { useUser } from '../auth/AuthContext';
import logo from '/images/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const user = useUser();

  useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      user.setAuthenticated(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    user.setAuthenticated(false);
    navigate('/');
  };

  let navItems = [
    { path: '/', title: 'Home' },
    { path: '/FindJobs', title: 'Find Jobs' },
    // { path: '/Calender', title: 'Calendar View' },
    // { path: "/JobRole", title: "Job Role" },
    // { path: "/ProfilePage", title: "Profile Page" },
  ];

  if (user.authenticated) {
    navItems.push(
      { path: '/UploadJob', title: 'Upload Job' },
      { path: '/MyJobs', title: 'Applied Jobs' }
    );
  }

  return (
    <header
      className={
        `container px-4 mx-auto max-w-screen-2xl xl:px-24`
        //  ${isScrolled ? 'border-b-2 border-gray-300' : ''}
        //  ${isScrolled ? 'fixed top-0 left-0 w-full z-10 bg-white shadow' : ''}`
      }
    >
      <nav className="flex items-center justify-between w-full py-6">
        <Link
          to="/"
          className="text-2xl font-semibold text-gray-700"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-14"
          />
        </Link>

        <ul className="justify-center flex-1 hidden gap-12 md:flex">
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base font-semibold"
            >
              <NavLink
                to={path}
                // className="text-primary hover:text-gray-800"
                className={({ isActive }) => {
                  const linkClasses = ['text-primary', 'hover:text-gray-800'];
                  if (isActive) linkClasses.push('active');

                  return linkClasses.join(' ');
                }}
                activeClassName="active"
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* added */}
        {user.authenticated && (
          <div className="flex items-center mr-6">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
              <Link to="/profilePage">
                <FaUser className="text-xl text-gray-600 transition-colors duration-300 ease-in-out hover:text-theme" />
              </Link>
            </div>
          </div>
        )}

        {user.authenticated === false ? (
          <div className="hidden space-x-5 text-base font-semibold text-primary lg:block">
            <Link
              to="/login"
              className="px-5 py-2 border rounded hover:bg-gray-600 hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 text-white border rounded bg-theme hover:bg-gray-800"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <button
            className="px-5 py-2 font-semibold text-white border rounded bg-theme hover:bg-gray-800"
            onClick={logoutUser}
          >
            Logout
          </button>
        )}

        <div className="block md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? '' : 'hidden'
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="py-1 text-base font-semibold text-white first:text-white hover:text-gray-400"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="py-1 text-white hover:text-gray-400">
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
