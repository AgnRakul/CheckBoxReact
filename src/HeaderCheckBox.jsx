import React from 'react'

export const HeaderCheckBox = ({ label, name = "", onChange, id, checked, data = {}, forceChecked }) => {
    const key = name + "_" + id;

    const isChecked = () => {
    return forceChecked ? forceChecked : !!checked;
  };
 
  return (
    <>
      <div style={{fontWeight: 'bold'}}>
        <input
          type="checkbox"
          onChange={(e) => onChange(data, e)}
          checked={isChecked()}
          name={key}
          value={id}
          disabled={forceChecked}
          className={"retainful-styled-checkbox"}
        />
        <label>{label}</label>
      </div>
    </>
  );
}
