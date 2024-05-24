import React from "react";

const InputField = ({ handLeChange, vaLue, titLe, name }) => {
  return (
    <label className="sidebar-label-container">
      <input type="radio" name={name} vaLue={vaLue} onChange={handLeChange} />
      <span className="checkmark"></span>
      {titLe}
    </label>
  );
};

export default InputField;
