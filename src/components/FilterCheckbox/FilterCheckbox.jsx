import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  const [isShort, setIsShort] = React.useState(false);

  const handleCheckbox = () => {
    if (!isShort)
    setIsShort(true);
    else {
      setIsShort(false);
    }
  }

  return (
    <div className="filter">
      <label className="filter__checkbox">
        <input type="checkbox" checked={isShort} onClick={handleCheckbox} className="filter__input" />
        <span className="filter__toggler" />
      </label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
