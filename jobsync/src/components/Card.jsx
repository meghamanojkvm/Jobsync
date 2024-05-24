import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const Card = ({ data }) => {
  const {
    companyName,
    jobTitle,
    companyLogo,
    jobLocation,
    postingDate,
    description,
    jobLink,
  } = data;
  return (
    <section className="card">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={jobLink}
        className="flex flex-col items-start gap-4 sm:flex-row"
      >
        <img
          src={companyLogo}
          alt=""
        />
        <div>
          <h4 className="mb-1 text-primary">{companyName}</h4>
          <h3 className="mb-2 text-lg font-semibold">{jobTitle}</h3>

          <div className="flex flex-wrap gap-2 mb-2 text-base text-primary/70">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {postingDate}
            </span>
          </div>

          <p className="text-base text-primary/70">{description}</p>
        </div>
      </a>
    </section>
  );
};

export default Card;
