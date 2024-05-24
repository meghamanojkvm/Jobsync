import React from 'react';
import InputField from '../components/InputField';

const CompanyName = ({ handLeChange }) => {
  return (
    <div>
      <h4 className="mb-2 font-medium test-lg">Company Name</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handLeChange}
          />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handLeChange={handLeChange}
          vaLue="Amazon"
          titLe="Amazon"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue="Ford"
          titLe="Ford"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue="Wipro"
          titLe="Wipro"
          name="test"
        />
      </div>
    </div>
  );
};

export default CompanyName;
