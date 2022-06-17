import React from "react";
import { HeaderCheckBox } from "./HeaderCheckBox";

export const Resource = ({ onChange, resource }) => {
  const { id, name, index, checked } = resource;
  const handleChange = (data, e) => {
    onChange && onChange(data, e);
  };

  return (
    <>
      <HeaderCheckBox
        checked={checked}
        label={name}
        name="resource"
        data={{ resourceIndex: index }}
        id={id}
        onChange={handleChange}
      />

      <label>{resource.description || ""}</label>
    </>
  );
};