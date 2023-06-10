import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <div className="filter">
      <label className="filter__checkbox">
        <input type="checkbox" className="filter__input" />
        <span className="filter__toggler" />
      </label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
