import React from 'react';
import InputField from '../components/InputField';

const Location = ({ handLeChange }) => {
  return (
    <div>
      <h4 className="mb-2 font-medium test-lg">Location</h4>

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
          vaLue="Bengaluru"
          titLe="Bengaluru"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue="Bangalore"
          titLe="Bangalore"
          name="test"
        />
        <InputField
          handLeChange={handLeChange}
          vaLue="India"
          titLe="India"
          name="test"
        />

        <InputField
          handLeChange={handLeChange}
          vaLue="Pune"
          titLe="Pune"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
