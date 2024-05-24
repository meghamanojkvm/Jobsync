import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="footer-wrapper"
      style={{
        backgroundColor: "#fafafa",
        marginTop: "auto",
        padding: "20px 0",
      }}
    >
      <div className="footer-section-column">
        <h3>STAY CONNECTED</h3>
        <div className="footer-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-theme"
          >
            <BsTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-theme"
          >
            <SiLinkedin />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-theme"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
      <div className="footer-section-column">
        <div className="footer-page hover:text-theme">
          <h3>PAGES LINK</h3>
          <span className="hover:text-theme">
            <a href="/">Home</a>
          </span>
          <span className="hover:text-theme">
            {" "}
            <a href="/FindJobs">Find Jobs</a>
          </span>
          <span className="hover:text-theme">
            {" "}
            <a href="/UploadJob">Upload Job</a>
          </span>
          <span className="hover:text-theme">
            {" "}
            <a href="/MyJobs">Applied Jobs</a>
          </span>
        </div>
      </div>
      <div className="footer-section-column">
        <div className="footer-email">
          <h3>CONTACT US</h3>
          <span>454-5663-7783</span>
          <span>244-5333-7783</span>
          <span>jobsync@gmail.com</span>
          <span>query@gmail.com</span>
          <span>contact@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
