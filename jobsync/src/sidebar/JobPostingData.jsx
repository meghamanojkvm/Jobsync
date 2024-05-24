import React from "react";
import InputField from "../components/InputField";

const JobPostingData = ({ handLeChange }) => {
  const now = new Date();
  //console.log(now)
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  //   console.log(twentyFourHoursAgo);

  //convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);
  const sixMonthsAgoDate = sixMonthsAgo.toISOString().slice(0, 10);

  //   console.log(twentyFourHoursAgoDate);

  return (
    <div>
      <h4 className="test-lg font-medium mb-2">Date of posting</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handLeChange}
          />
          <span className="checkmark"></span>All time
        </label>
        <InputField
          handLeChange={handLeChange}
          vaLue={twentyFourHoursAgoDate}
          titLe="Last 24 hours"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue={SevenDaysAgoDate}
          titLe="Last 7 days"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue={ThirtyDaysAgoDate}
          titLe="Last Month"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue={sixMonthsAgoDate}
          titLe="Last 6 Months"
          name="test"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
