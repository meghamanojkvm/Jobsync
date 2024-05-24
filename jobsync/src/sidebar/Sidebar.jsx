import React from "react";
import Location from "./Location";
import JobPostingData from "./JobPostingData";
import CompanyName from "./CompanyName";

const Sidebar = ({ handLeChange, handLeClick }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Location handLeChange={handLeChange} />
      <JobPostingData handLeChange={handLeChange} />
      <CompanyName handLeChange={handLeChange} />
    </div>
  );
};

export default Sidebar;
