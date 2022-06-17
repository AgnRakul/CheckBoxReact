import React from "react";
import find from "lodash/find";
import { HeaderCheckBox } from "./HeaderCheckBox";

export function ScopeItem({
  scope,
  scopes,
  onChange,
  forceChecked,
  selectedScopeCategories = [],
}) {
  const { item, scopeIndex, resourceIndex } = scope;
  const { value, checked, id, label, category } = item;

  const handleChange = (data, e) => onChange && onChange(data, e);

  const isReadScope = () =>
    value === "read" && selectedScopeCategories.includes(category);

  const isWriteScopeChecked = () =>
    !!find(scopes, { category, value: "write", checked: true });

  const isForceChecked = () => {
    return !!(
      forceChecked ||
      (isReadScope() && !checked) ||
      (isReadScope() && isWriteScopeChecked())
    );
  };

  return (
    <>
      <HeaderCheckBox
        label={label}
        onChange={handleChange}
        name="scope"
        checked={checked}
        id={id}
        value={value}
        data={{ selectedScope: item, resourceIndex, scopeIndex }}
        forceChecked={isForceChecked()}
      />
      <label>{item.description || ""}</label>
    </>
  );
}
