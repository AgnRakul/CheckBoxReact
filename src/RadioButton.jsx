import { get, map } from "lodash";
import React, { useEffect, useState } from "react";
import PredefinedScope from "./PredefinedScope.json";

export function RadioButton({ onChange, activeRole }) {
  const [checkedRole, setCheckedRole] = useState(activeRole);

  useEffect(() => {
    setCheckedRole(activeRole);
  }, [activeRole]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCheckedRole(value);
    onChange && onChange(get(PredefinedScope, value), value);
  };

  return (
    <div className="mb-3 font-weight-bold">
        {map(PredefinedScope, (role, roleIndex) => {
          return (
            <div key={roleIndex}>
              <input
                type="radio"
                id={roleIndex}
                value={roleIndex}
                onChange={handleChange}
                checked={checkedRole === roleIndex}
                className={"retainful-styled-checkbox"}
              />
              <label check>{role.name}</label>
            </div>
          );
        })}

    </div>
  );
}